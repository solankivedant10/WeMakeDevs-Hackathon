# Terraform configuration to destroy zombie resources identified in waste-report.json
# Generated on: 2025-12-10T09:00:02.404767
# Audit ID: audit-20251210-090002
# Total Monthly Savings: $626.84 | Annual Savings: $7,522.08

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# ==============================================================================
# EC2 INSTANCES TO TERMINATE
# ==============================================================================

# Resource: dev-test-server-old (i-0a1b2c3d4e5f6)
# Reason: CPU < 5% for 30+ days
# Monthly Cost: $145.50
resource "aws_ec2_instance_state" "terminate_i_0a1b2c3d4e5f6" {
  instance_id = "i-0a1b2c3d4e5f6"
  state       = "terminated"
}

# ==============================================================================
# EBS VOLUMES TO DELETE
# ==============================================================================

# Resource: unattached-volume-backup (vol-9x8y7z6w5v4u3)
# Reason: Unattached for 60+ days
# Monthly Cost: $89.20
# Region: us-west-2
resource "aws_ebs_volume" "zombie_vol_9x8y7z6w5v4u3" {
  # This is a placeholder to manage the volume lifecycle
  # To delete: Run `terraform destroy -target=aws_ebs_volume.zombie_vol_9x8y7z6w5v4u3`
  # Or manually delete using: aws ec2 delete-volume --volume-id vol-9x8y7z6w5v4u3 --region us-west-2
  
  # Note: This resource block is for tracking only. 
  # Use terraform import or manually delete the volume.
}

# ==============================================================================
# EBS SNAPSHOTS TO DELETE
# ==============================================================================

# Resource: weekly-backup-2024-08 (snap-1a2b3c4d5e6f7)
# Reason: Snapshot older than 90 days, no longer needed
# Monthly Cost: $34.75
# Region: us-east-1
resource "aws_ebs_snapshot" "zombie_snap_1a2b3c4d5e6f7" {
  # This is a placeholder to manage the snapshot lifecycle
  # To delete: Run `terraform destroy -target=aws_ebs_snapshot.zombie_snap_1a2b3c4d5e6f7`
  # Or manually delete using: aws ec2 delete-snapshot --snapshot-id snap-1a2b3c4d5e6f7 --region us-east-1
  
  # Note: This resource block is for tracking only.
  # Use terraform import or manually delete the snapshot.
}

# ==============================================================================
# RDS INSTANCES TO DELETE
# ==============================================================================

# Resource: staging-postgres-old (i-staging-db-unused)
# Reason: Zero connections for 80+ days
# Monthly Cost: $289.99
# Region: eu-west-1
# 
# MANUAL ACTION REQUIRED:
# RDS instances should be carefully deleted to avoid data loss.
# 
# Steps to delete manually:
# 1. Create a final snapshot (optional but recommended):
#    aws rds create-db-snapshot \
#      --db-instance-identifier i-staging-db-unused \
#      --db-snapshot-identifier staging-postgres-old-final-snapshot \
#      --region eu-west-1
# 
# 2. Delete the RDS instance:
#    aws rds delete-db-instance \
#      --db-instance-identifier i-staging-db-unused \
#      --skip-final-snapshot \
#      --region eu-west-1
# 
# Or use Terraform:
# resource "aws_db_instance" "zombie_rds_staging" {
#   identifier = "i-staging-db-unused"
#   # Import first: terraform import aws_db_instance.zombie_rds_staging i-staging-db-unused
#   # Then destroy: terraform destroy -target=aws_db_instance.zombie_rds_staging
# }

# ==============================================================================
# S3 BUCKETS - MANUAL DELETION RECOMMENDED
# ==============================================================================

# Resource: company-logs-2023 (s3-old-logs-bucket)
# Reason: Zero requests for 11+ months
# Monthly Cost: $67.40
# Region: us-east-1
#
# ⚠️  IMPORTANT: S3 BUCKET DELETION REQUIRES MANUAL INTERVENTION ⚠️
#
# S3 buckets cannot be easily force-deleted with Terraform if they contain objects,
# and doing so without proper review carries significant risk of data loss.
#
# Recommended steps for manual deletion:
#
# 1. Review bucket contents before deletion:
#    aws s3 ls s3://s3-old-logs-bucket --recursive --region us-east-1
#
# 2. Check if versioning is enabled:
#    aws s3api get-bucket-versioning --bucket s3-old-logs-bucket --region us-east-1
#
# 3. If you're certain the data is no longer needed, empty the bucket:
#    aws s3 rm s3://s3-old-logs-bucket --recursive --region us-east-1
#
# 4. If versioning is enabled, delete all versions:
#    aws s3api delete-objects --bucket s3-old-logs-bucket \
#      --delete "$(aws s3api list-object-versions --bucket s3-old-logs-bucket \
#      --query='{Objects: Versions[].{Key:Key,VersionId:VersionId}}' --region us-east-1)"
#
# 5. Finally, delete the bucket:
#    aws s3 rb s3://s3-old-logs-bucket --region us-east-1
#
# Alternative using Terraform (after manual emptying):
# resource "aws_s3_bucket" "zombie_s3_old_logs" {
#   bucket = "s3-old-logs-bucket"
#   force_destroy = true  # Use with extreme caution!
# }
# Then run: terraform destroy -target=aws_s3_bucket.zombie_s3_old_logs

# ==============================================================================
# USAGE INSTRUCTIONS
# ==============================================================================
#
# To terminate EC2 instances only:
#   terraform init
#   terraform plan
#   terraform apply
#
# To destroy specific resources:
#   terraform destroy -target=aws_ec2_instance_state.terminate_i_0a1b2c3d4e5f6
#
# Total estimated monthly savings after cleanup: $626.84
# Total estimated annual savings after cleanup: $7,522.08
