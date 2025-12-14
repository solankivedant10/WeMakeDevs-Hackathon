import json
import os
from datetime import datetime

# --- CONFIGURATION ---
# Paths match the Docker volume mounts defined in docker-compose.yml
INPUT_FILE = '/app/mock_data/mock-aws-bill.json'
OUTPUT_FILE = '/app/mock_data/waste-report.json'

def detect_waste():
    print(f"🔍 Starting Waste Detection Audit...")
    
    # 1. Read the Mock AWS Bill
    try:
        with open(INPUT_FILE, 'r') as f:
            billing_data = json.load(f)
        print(f"✅ Loaded billing data for period: {billing_data.get('billing_period', 'Unknown')}")
    except FileNotFoundError:
        print(f"❌ Error: Input file not found at {INPUT_FILE}")
        return
    except json.JSONDecodeError:
        print(f"❌ Error: Failed to decode JSON from {INPUT_FILE}")
        return

    # 2. Analyze Resources
    zombies = []
    total_monthly_savings = 0.0
    
    print(f"📊 Analyzing {len(billing_data.get('resources', []))} resources...")
    
    for resource in billing_data.get('resources', []):
        # Check if resource is marked as zombie
        if resource.get('is_zombie', False):
            cost = resource.get('cost_per_month', 0.0)
            
            # Add to our list
            zombies.append({
                "resource_id": resource.get('id'),
                "name": resource.get('name'),
                "type": resource.get('type'),
                "region": resource.get('region'),
                "monthly_cost": cost,
                "reason": resource.get('zombie_reason', 'Unknown anomaly detected')
            })
            
            total_monthly_savings += cost

    # 3. Create the Waste Report
    waste_report = {
        "audit_id": f"audit-{datetime.now().strftime('%Y%m%d-%H%M%S')}",
        "generated_at": datetime.now().isoformat(),
        "summary": {
            "total_resources_scanned": len(billing_data.get('resources', [])),
            "zombie_resource_count": len(zombies),
            "total_monthly_savings": round(total_monthly_savings, 2),
            "total_annual_savings": round(total_monthly_savings * 12, 2),
            "status": "ACTION_REQUIRED" if zombies else "OPTIMIZED"
        },
        "zombies": zombies
    }

    # 4. Save the Report
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(waste_report, f, indent=2)

    # 5. Output Summary for Kestra Logs
    print("-" * 30)
    print(f"🚫 ZOMBIES DETECTED: {len(zombies)}")
    print(f"💰 POTENTIAL SAVINGS: ${waste_report['summary']['total_monthly_savings']}/mo")
    print(f"📂 Report saved to: {OUTPUT_FILE}")
    print("-" * 30)

    # Print JSON string of the report so Kestra can capture it in an output variable if needed
    print(json.dumps(waste_report))

if __name__ == "__main__":
    detect_waste()