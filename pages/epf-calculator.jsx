"use client";
import { useState } from "react";

export default function EPFCalculator() {
  const [basicSalary, setBasicSalary] = useState(25000);
  const [age, setAge] = useState(25);
  const [epfContribution, setEpfContribution] = useState(12);
  const [annualIncrement, setAnnualIncrement] = useState(5);
  const [interestRate, setInterestRate] = useState(8.25); // Current EPF Interest Rate

  const calculateEPF = () => {
    let totalBalance = 0;
    let totalEmployeeContrib = 0;
    let totalEmployerContrib = 0;
    let currentSalary = Number(basicSalary);
    const yearsToRetire = 58 - Number(age);
    const monthlyRate = Number(interestRate) / 12 / 100;

    for (let i = 0; i < yearsToRetire; i++) {
      for (let month = 0; month < 12; month++) {
        // Employee Contribution (12% of Basic)
        const empMonthly = currentSalary * (Number(epfContribution) / 100);
        
        // Employer Contribution (3.67% to EPF, rest 8.33% goes to EPS)
        const emprMonthly = currentSalary * 0.0367;

        totalEmployeeContrib += empMonthly;
        totalEmployerContrib += emprMonthly;
        
        const monthlyDeposit = empMonthly + emprMonthly;
        totalBalance = (totalBalance + monthlyDeposit) * (1 + monthlyRate);
      }
      // Annual Salary Increase
      currentSalary += currentSalary * (Number(annualIncrement) / 100);
    }

    const totalInterest = totalBalance - (totalEmployeeContrib + totalEmployerContrib);

    return {
      maturityAmount: Math.round(totalBalance),
      employeeTotal: Math.round(totalEmployeeContrib),
      employerTotal: Math.round(totalEmployerContrib),
      interestEarned: Math.round(totalInterest > 0 ? totalInterest : 0),
    };
  };

  const result = calculateEPF();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
        EPF Calculator (Employee Provident Fund)
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Calculate your retirement corpus and interest earned on your EPF savings.
      </p>

      {/* Calculator Inputs & Output Card */}
      <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Basic Salary + DA (₹)</label>
            <input
              type="number"
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
              className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Your Current Age (Years)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Your EPF Contribution (%)</label>
            <input
              type="number"
              value={epfContribution}
              onChange={(e) => setEpfContribution(e.target.value)}
              className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Expected Annual Salary Growth (%)</label>
            <input
              type="number"
              value={annualIncrement}
              onChange={(e) => setAnnualIncrement(e.target.value)}
              className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">EPF Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Results Box */}
        <div className="bg-emerald-50 p-6 rounded-xl flex flex-col justify-between border border-emerald-100">
          <div>
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">Retirement Summary (Age 58)</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Employee Contribution:</span>
                <span className="font-semibold">₹{result.employeeTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Employer Contribution:</span>
                <span className="font-semibold">₹{result.employerTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Interest Earned:</span>
                <span className="font-semibold text-emerald-600">₹{result.interestEarned.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-emerald-200 mt-4">
            <span className="text-sm text-emerald-800 block">Total Accumulated Corpus</span>
            <span className="text-3xl font-extrabold text-emerald-700">
              ₹{result.maturityAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* SEO Content Section for AdSense Approval */}
      <article className="mt-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6 text-gray-700">
        <h2 className="text-2xl font-bold text-gray-800">What is Employee Provident Fund (EPF)?</h2>
        <p>
          The Employee Provident Fund (EPF) is a government-backed retirement savings scheme managed by the Employees' Provident Fund Organisation (EPFO) in India. Both the employee and the employer contribute a fixed percentage of the basic salary every month toward building a substantial lump-sum corpus upon retirement at the age of 58.
        </p>

        <h3 className="text-xl font-semibold text-gray-800">How is EPF Calculated?</h3>
        <p>
          EPF contributions are split into two major components based on your monthly Basic Salary + Dearness Allowance (DA):
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Employee Contribution:</strong> Exactly 12% of basic salary directly goes into the EPF account.</li>
          <li><strong>Employer Contribution:</strong> Out of the employer's 12% contribution, 3.67% goes to EPF, while 8.33% is directed into the Employees' Pension Scheme (EPS).</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800">Frequently Asked Questions (FAQs)</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">1. What is the current EPF interest rate?</h4>
            <p className="text-sm">The EPFO sets the annual interest rate for EPF accounts, which is currently calculated on a monthly compounding basis.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">2. Is EPF maturity tax-free?</h4>
            <p className="text-sm">Yes, EPF withdrawals are completely tax-exempt under Section 80C, provided you complete at least 5 years of continuous service.</p>
          </div>
        </div>
      </article>
    </div>
  );
        }
