'use client';

import { motion } from 'framer-motion';
import { HeroStats } from '@/components/hero-stats';
import { WasteDonutChart } from '@/components/waste-donut-chart';
import { SavingsBarChart } from '@/components/savings-bar-chart';
import { ZombieTable } from '@/components/zombie-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import CodeBlock from '@/components/CodeBlock';
import wasteReport from '@/data/waste-report.json';
import { useState } from 'react';
import { Shield, Rocket, Trash2, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const [safetyCheckRunning, setSafetyCheckRunning] = useState(false);
  const [safetyCheckPassed, setSafetyCheckPassed] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSafetyCheck = () => {
    setSafetyCheckRunning(true);
    setTimeout(() => {
      setSafetyCheckRunning(false);
      setSafetyCheckPassed(true);
    }, 2000);
  };

  const handleDeployFix = () => {
    setDeploySuccess(true);
    setTimeout(() => {
      alert('✅ Success! Terraform configuration has been deployed. Resources will be cleaned up shortly.');
    }, 300);
  };

  const handleApproveDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setDeleted(true);
      alert('🧹 Cleanup simulated! In production, this would trigger the Kestra cleanup workflow.');
    }, 1500);
  };

  // Calculate before and after bills
  const beforeBill = 12500.0; // Example before audit bill
  const afterBill = beforeBill - wasteReport.summary.total_monthly_savings;

  const terraformCode = `# Terraform configuration to destroy zombie resources
# Generated on: ${wasteReport.generated_at}
# Audit ID: ${wasteReport.audit_id}
# Total Monthly Savings: $${wasteReport.summary.total_monthly_savings} | Annual Savings: $${wasteReport.summary.total_annual_savings}

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

${wasteReport.zombies
      .filter((z) => z.type.includes('EC2'))
      .map(
        (z) => `# Resource: ${z.name} (${z.resource_id})
# Reason: ${z.reason}
# Monthly Cost: $${z.monthly_cost}
resource "aws_ec2_instance_state" "terminate_${z.resource_id.replace(/-/g, '_')}" {
  instance_id = "${z.resource_id}"
  state       = "terminated"
}
`
      )
      .join('\n')}

# Total estimated monthly savings after cleanup: $${wasteReport.summary.total_monthly_savings}
# Total estimated annual savings after cleanup: $${wasteReport.summary.total_annual_savings}
`;

  return (
    <main className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="w-full space-y-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-3xl shadow-2xl shadow-emerald-500/30">
              🤖
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Cloud Janitor
              </h1>
              <p className="text-sm text-slate-400 font-mono">
                Audit ID: {wasteReport.audit_id}
              </p>
            </div>
          </div>
          <Badge className="bg-red-500/20 text-red-400 border-red-500/40 px-4 py-2 text-sm font-semibold w-fit animate-pulse flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {wasteReport.summary.zombie_resource_count} Zombies Detected
          </Badge>
        </motion.header>

        <Separator className="bg-slate-800/50" />

        {/* Hero Section - Storytelling */}
        <HeroStats
          beforeBill={beforeBill}
          afterBill={afterBill}
          annualSavings={wasteReport.summary.total_annual_savings}
        />

        {/* Data Visualization Layer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <WasteDonutChart
              zombieCount={wasteReport.summary.zombie_resource_count}
              totalResources={wasteReport.summary.total_resources_scanned}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <SavingsBarChart zombies={wasteReport.zombies} />
          </motion.div>
        </div>

        {/* Zombie Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ZombieTable zombies={wasteReport.zombies} />
        </motion.div>

        {/* Action Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleApproveDelete}
            disabled={isDeleting || deleted}
            size="lg"
            className={`
              px-10 py-6 text-lg font-bold transition-transform hover:scale-105
              ${deleted
                ? 'bg-emerald-600 hover:bg-emerald-600 text-white shadow-emerald-500/40'
                : isDeleting
                  ? 'bg-slate-600 hover:bg-slate-600 text-slate-300'
                  : 'bg-linear-to-r from-red-600 via-orange-600 to-red-600 hover:from-red-500 hover:via-orange-500 hover:to-red-500 text-white shadow-red-500/40'
              }
            `}
          >
            {deleted ? (
              <>
                <Shield className="w-5 h-5" />
                Cleanup Approved!
              </>
            ) : isDeleting ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                Processing...
              </>
            ) : (
              <>
                <Trash2 className="w-5 h-5" />
                Approve Deletion
              </>
            )}
          </Button>
        </motion.div>

        {/* Action Command Center */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="glass-strong border-slate-800/50 bg-slate-900/60 backdrop-blur-xl">
            <CardHeader className="border-b border-slate-800/50 bg-linear-to-r from-purple-900/20 to-pink-900/20">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
                    <span>🔧</span> Generated Fix (Infrastructure as Code)
                  </CardTitle>
                  <p className="text-sm text-slate-400 mt-2">
                    AI-generated cleanup script • ${wasteReport.summary.total_monthly_savings.toFixed(2)}/mo savings
                  </p>
                </div>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/40 text-xs font-semibold">
                  🔧 Terraform HCL
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <CodeBlock code={terraformCode} language="terraform" />

              {/* Safety Check Section */}
              <div className="flex flex-col items-center gap-6 pt-4">
                {!safetyCheckPassed && !safetyCheckRunning && (
                  <Button
                    onClick={handleSafetyCheck}
                    size="lg"
                    className="px-10 py-6 text-lg font-bold bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 text-white shadow-purple-500/40"
                  >
                    <Shield className="w-5 h-5" />
                    Run CodeRabbit Safety Check
                  </Button>
                )}

                {safetyCheckRunning && (
                  <Card className="glass-card border-purple-500/40 bg-purple-950/20 w-full max-w-md ring-2 ring-purple-500/20 shadow-lg shadow-purple-500/20">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full" />
                      <div className="flex flex-col gap-1">
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/40 w-fit text-xs">
                          🐰 CodeRabbit AI
                        </Badge>
                        <span className="text-purple-300 font-bold text-lg">
                          Analyzing infrastructure changes...
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {safetyCheckPassed && (
                  <Card className="glass-card border-emerald-500/40 bg-emerald-950/20 w-full max-w-md ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-500/20">
                    <CardContent className="flex items-center gap-4 p-6">
                      <span className="text-3xl">✅</span>
                      <div className="flex flex-col gap-1">
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 w-fit text-xs">
                          🐰 CodeRabbit AI
                        </Badge>
                        <span className="text-emerald-300 font-bold text-xl">
                          Security Audit: PASSED
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Deploy Fix Button */}
                {safetyCheckPassed && (
                  <Button
                    onClick={handleDeployFix}
                    disabled={deploySuccess}
                    size="lg"
                    className={`
                      px-10 py-6 text-lg font-bold
                      ${deploySuccess
                        ? 'bg-emerald-600 hover:bg-emerald-600 text-white shadow-emerald-500/40'
                        : 'bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 text-white shadow-blue-500/40'
                      }
                    `}
                  >
                    {deploySuccess ? (
                      <>
                        <Shield className="w-5 h-5" />
                        Deployed Successfully!
                      </>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5" />
                        Deploy Fix
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-slate-600 font-mono pb-8">
          <p suppressHydrationWarning className="text-gray-500 text-sm">
            Generated at: {new Date(wasteReport.generated_at).toLocaleString()}
          </p>
        </footer>
      </div>
    </main>
  );
}
