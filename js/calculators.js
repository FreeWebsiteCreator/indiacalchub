/**
 * Indian Calculator Hub - Core Mathematical Engine
 * Accurate, zero-dependency, instantaneous calculation algorithms
 * with localized Indian numbering system (Lakhs & Crores).
 */

const IndianCalc = {
  // Format numbers in Indian Rupee format (e.g., ₹ 1,50,000)
  formatINR: function(num) {
    if (isNaN(num) || !isFinite(num)) return '₹ 0';
    const rounded = Math.round(num);
    const formatted = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(rounded);
    return '₹ ' + formatted;
  },

  // Format with decimal precision
  formatNumber: function(num, decimals = 2) {
    if (isNaN(num) || !isFinite(num)) return '0';
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  },

  // Convert large numbers to Indian wording (e.g. 1.25 Lakh, 2.50 Cr)
  formatIndianWords: function(num) {
    if (isNaN(num) || !isFinite(num)) return '';
    const abs = Math.abs(num);
    if (abs >= 10000000) {
      return `(${(num / 10000000).toFixed(2)} Cr)`;
    } else if (abs >= 100000) {
      return `(${(num / 100000).toFixed(2)} Lakh)`;
    }
    return '';
  },

  // 1. EMI Calculator (Reducing balance)
  calculateEMI: function(principal, annualRate, tenureYears) {
    const P = parseFloat(principal);
    const R = parseFloat(annualRate);
    const N = parseFloat(tenureYears) * 12; // months

    if (P <= 0 || N <= 0) {
      return { emi: 0, totalInterest: 0, totalPayment: 0, principalPercent: 0, interestPercent: 0 };
    }

    if (R === 0) {
      const emi = P / N;
      return {
        emi: Math.round(emi),
        totalInterest: 0,
        totalPayment: Math.round(P),
        principalPercent: 100,
        interestPercent: 0
      };
    }

    const r = (R / 12) / 100; // monthly interest
    const emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    const pPercent = (P / totalPayment) * 100;
    const iPercent = (totalInterest / totalPayment) * 100;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principal: Math.round(P),
      principalPercent: pPercent.toFixed(1),
      interestPercent: iPercent.toFixed(1)
    };
  },

  // 2. SIP Calculator (Systematic Investment Plan)
  calculateSIP: function(monthlyInvest, annualRate, years) {
    const P = parseFloat(monthlyInvest);
    const i = parseFloat(annualRate) / 100;
    const t = parseFloat(years);
    const n = t * 12; // total months

    if (P <= 0 || n <= 0) {
      return { invested: 0, totalReturns: 0, maturityValue: 0, investedPercent: 0, gainPercent: 0 };
    }

    const invested = P * n;

    if (i === 0) {
      return {
        invested: Math.round(invested),
        totalReturns: 0,
        maturityValue: Math.round(invested),
        investedPercent: 100,
        gainPercent: 0
      };
    }

    const r = i / 12; // monthly rate
    // SIP Maturity formula: P * [( (1 + r)^n - 1 ) / r] * (1 + r)
    const maturity = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalReturns = maturity - invested;

    const invPercent = (invested / maturity) * 100;
    const gainPercent = (totalReturns / maturity) * 100;

    return {
      invested: Math.round(invested),
      totalReturns: Math.round(totalReturns),
      maturityValue: Math.round(maturity),
      investedPercent: invPercent.toFixed(1),
      gainPercent: gainPercent.toFixed(1)
    };
  },

  // 3. Fixed Deposit (FD) Calculator
  calculateFD: function(principal, annualRate, years, compoundingPerYear = 4, isSenior = false) {
    const P = parseFloat(principal);
    let R = parseFloat(annualRate);
    if (isSenior) R += 0.50; // Standard Indian senior citizen 50 bps premium
    const t = parseFloat(years);
    const n = parseInt(compoundingPerYear, 10);

    if (P <= 0 || t <= 0) {
      return { principal: 0, maturity: 0, interest: 0, effectiveRate: 0, tdsAlert: false };
    }

    // Compound Interest: A = P * (1 + r/n)^(n*t)
    const r = (R / 100);
    const maturity = P * Math.pow(1 + (r / n), n * t);
    const interest = maturity - P;
    const effectiveRate = ((maturity - P) / P / t) * 100;

    // Annual interest estimation for TDS threshold (₹40,000 for regular, ₹50,000 for senior in India)
    const annualInterestAvg = interest / t;
    const tdsLimit = isSenior ? 50000 : 40000;
    const tdsAlert = annualInterestAvg > tdsLimit;

    return {
      principal: Math.round(P),
      maturity: Math.round(maturity),
      interest: Math.round(interest),
      effectiveRate: effectiveRate.toFixed(2),
      appliedRate: R.toFixed(2),
      tdsAlert: tdsAlert,
      annualInterestAvg: Math.round(annualInterestAvg)
    };
  },

  // 4. GST Calculator (Exclusive vs Inclusive)
  calculateGST: function(amount, ratePercent, isInclusive = false) {
    const A = parseFloat(amount);
    const R = parseFloat(ratePercent);

    if (A <= 0 || isNaN(A)) {
      return { netAmount: 0, gstAmount: 0, totalAmount: 0, cgst: 0, sgst: 0 };
    }

    let netAmount, gstAmount, totalAmount;

    if (isInclusive) {
      // Amount includes GST: Net = A / (1 + R/100)
      netAmount = A / (1 + (R / 100));
      gstAmount = A - netAmount;
      totalAmount = A;
    } else {
      // Amount excludes GST: GST = A * R/100
      gstAmount = (A * R) / 100;
      netAmount = A;
      totalAmount = A + gstAmount;
    }

    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;

    return {
      netAmount: Math.round(netAmount),
      gstAmount: Math.round(gstAmount),
      totalAmount: Math.round(totalAmount),
      cgst: (gstAmount / 2).toFixed(2),
      sgst: (gstAmount / 2).toFixed(2),
      rate: R
    };
  },

  // 5. Percentage Calculator (Multiple modes)
  calculatePercentage: {
    // Mode 1: What is X% of Y?
    percentOf: function(percent, value) {
      const p = parseFloat(percent);
      const v = parseFloat(value);
      if (isNaN(p) || isNaN(v)) return 0;
      return (p * v) / 100;
    },
    // Mode 2: X is what percent of Y?
    isWhatPercent: function(part, whole) {
      const p = parseFloat(part);
      const w = parseFloat(whole);
      if (isNaN(p) || isNaN(w) || w === 0) return 0;
      return (p / w) * 100;
    },
    // Mode 3: Percentage increase / decrease from V1 to V2
    percentChange: function(initial, finalVal) {
      const v1 = parseFloat(initial);
      const v2 = parseFloat(finalVal);
      if (isNaN(v1) || isNaN(v2) || v1 === 0) return { change: 0, type: 'none' };
      const diff = v2 - v1;
      const change = (diff / v1) * 100;
      return {
        change: Math.abs(change).toFixed(2),
        diff: (diff).toFixed(2),
        type: diff >= 0 ? 'increase' : 'decrease'
      };
    },
    // Mode 4: Exam marks to percentage
    marksToPercent: function(obtained, total) {
      const o = parseFloat(obtained);
      const t = parseFloat(total);
      if (isNaN(o) || isNaN(t) || t === 0) return 0;
      return ((o / t) * 100).toFixed(2);
    }
  },

  // 6. CGPA to Percentage Calculator (CBSE 9.5, Mumbai Univ, AICTE)
  calculateCGPA: function(cgpa, formulaType = 'cbse') {
    const score = parseFloat(cgpa);
    if (isNaN(score) || score <= 0) {
      return { percentage: 0, gradeLetter: '-', classification: '-' };
    }

    let percentage = 0;
    if (formulaType === 'cbse') {
      // Standard CBSE Multiplier
      percentage = score * 9.5;
    } else if (formulaType === 'mumbai') {
      // Mumbai University: (CGPA * 7.1) + 11 (for 7.0 and above) or 7.25 * CGPA + 11
      percentage = score >= 7 ? (7.1 * score) + 11 : (7.25 * score) + 11;
    } else if (formulaType === 'vtu') {
      // VTU Karnataka: (CGPA - 0.75) * 10
      percentage = (score - 0.75) * 10;
    } else {
      // Generic 10x scale
      percentage = score * 10;
    }

    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;

    // Academic Classification in India
    let classification = 'Pass';
    let gradeLetter = 'C';

    if (percentage >= 75) {
      classification = 'First Class with Distinction';
      gradeLetter = 'A+';
    } else if (percentage >= 60) {
      classification = 'First Class (Division I)';
      gradeLetter = 'A';
    } else if (percentage >= 50) {
      classification = 'Second Class (Division II)';
      gradeLetter = 'B';
    } else if (percentage >= 40) {
      classification = 'Third Class (Division III)';
      gradeLetter = 'C';
    } else {
      classification = 'Below Passing Standard';
      gradeLetter = 'F';
    }

    return {
      cgpa: score.toFixed(2),
      percentage: percentage.toFixed(2),
      classification: classification,
      gradeLetter: gradeLetter
    };
  },

  // 7. Age Calculator (Exact chronology & milestones)
  calculateAge: function(birthDateString, asOfDateString = null) {
    if (!birthDateString) return null;
    const birth = new Date(birthDateString);
    const today = asOfDateString ? new Date(asOfDateString) : new Date();

    if (isNaN(birth.getTime()) || birth > today) return null;

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      // Days in previous month
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total units
    const diffTime = Math.abs(today - birth);
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;

    // Next Birthday
    const currentYear = today.getFullYear();
    let nextBday = new Date(currentYear, birth.getMonth(), birth.getDate());
    if (nextBday < today) {
      nextBday = new Date(currentYear + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilNextBday = Math.ceil((nextBday - today) / (1000 * 60 * 60 * 24));

    // Day of week born
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const birthDayName = daysOfWeek[birth.getDay()];

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      daysUntilNextBday,
      birthDayName,
      isMajor: years >= 18,
      isSenior: years >= 60
    };
  },

  // 8. BMI Calculator (Asian Indian Cutoffs according to WHO & Ministry of Health)
  calculateBMI: function(weightKg, heightCm) {
    const w = parseFloat(weightKg);
    const hCm = parseFloat(heightCm);

    if (w <= 0 || hCm <= 0 || isNaN(w) || isNaN(hCm)) {
      return { bmi: 0, category: '-', idealWeightMin: 0, idealWeightMax: 0, statusClass: '' };
    }

    const hM = hCm / 100;
    const bmi = w / (hM * hM);

    // Asian Indian WHO specific cutoffs (Consensus guidelines for India)
    // Underweight: < 18.5
    // Normal / Healthy: 18.5 - 22.9 (vs 24.9 western)
    // Overweight: 23.0 - 24.9
    // Obese: >= 25.0
    let category = '';
    let statusClass = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      statusClass = 'badge-daily';
    } else if (bmi <= 22.9) {
      category = 'Healthy Normal (Indian Standard)';
      statusClass = 'badge-finance';
    } else if (bmi <= 24.9) {
      category = 'Overweight (Pre-obese)';
      statusClass = 'badge-daily';
    } else {
      category = 'Obese (High Metabolic Risk)';
      statusClass = 'badge-student';
    }

    // Ideal weight based on Asian Indian normal BMI range (18.5 - 22.9)
    const idealWeightMin = 18.5 * (hM * hM);
    const idealWeightMax = 22.9 * (hM * hM);

    return {
      bmi: bmi.toFixed(1),
      category: category,
      statusClass: statusClass,
      idealWeightMin: idealWeightMin.toFixed(1),
      idealWeightMax: idealWeightMax.toFixed(1),
      currentWeight: w
    };
  }
};

window.IndianCalc = IndianCalc;
