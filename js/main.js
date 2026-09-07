/**
 * Indian Calculator Hub - Main UI & Global Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileMenu = document.querySelector('.mobile-nav-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // 2. Global Calculator Search Data
  const calculatorsList = [
    { title: 'EMI Calculator', url: '/emi-calculator', category: 'Finance', keywords: 'home loan emi car loan personal loan interest sbi hdfc icici tenure' },
    { title: 'SIP Calculator', url: '/sip-calculator', category: 'Finance', keywords: 'systematic investment plan mutual fund returns compounding wealth nifty' },
    { title: 'FD Calculator', url: '/fd-calculator', category: 'Finance', keywords: 'fixed deposit interest maturity senior citizen quarterly compound post office' },
    { title: 'GST Calculator', url: '/gst-calculator', category: 'Finance', keywords: 'goods and services tax cgst sgst igst hsn reverse gst invoice' },
    { title: 'Percentage Calculator', url: '/percentage-calculator', category: 'Student', keywords: 'percent of number marks to percentage increase decrease discount math' },
    { title: 'CGPA to Percentage Calculator', url: '/cgpa-calculator', category: 'Student', keywords: 'cbse 9.5 multiplier mumbai university vtu aicte sgpa to percentage engineering' },
    { title: 'Age Calculator', url: '/age-calculator', category: 'Daily Life', keywords: 'date of birth exact age years months days next birthday retirement milestone' },
    { title: 'BMI Calculator', url: '/bmi-calculator', category: 'Daily Life', keywords: 'body mass index ideal weight asian indian cutoffs health obesity fitness' }
  ];

  // Search input interaction
  const searchInput = document.getElementById('global-search-input');
  const searchDropdown = document.getElementById('search-dropdown');

  if (searchInput && searchDropdown) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        searchDropdown.classList.remove('visible');
        searchDropdown.innerHTML = '';
        return;
      }

      const matches = calculatorsList.filter(item => {
        return item.title.toLowerCase().includes(query) ||
               item.keywords.toLowerCase().includes(query) ||
               item.category.toLowerCase().includes(query);
      });

      if (matches.length === 0) {
        searchDropdown.innerHTML = `<div style="padding: 1rem; color: #64748B; font-size: 0.875rem; text-align: center;">No calculators found for "${query}"</div>`;
        searchDropdown.classList.add('visible');
      } else {
        searchDropdown.innerHTML = matches.map(item => `
          <a href="${item.url}" class="search-result-item">
            <span style="font-weight: 600;">${item.title}</span>
            <span class="item-cat">${item.category}</span>
          </a>
        `).join('');
        searchDropdown.classList.add('visible');
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.remove('visible');
      }
    });
  }

  // 3. Homepage Category Filter Tabs
  const categoryTabs = document.querySelectorAll('.category-tabs .tab-btn');
  const calcCards = document.querySelectorAll('.calculators-grid .calc-card');

  if (categoryTabs.length > 0 && calcCards.length > 0) {
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-category');

        calcCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. Toast Notification System
  window.showToast = function(msg) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${msg}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  // 5. Copy Text Utility
  window.copyToClipboard = function(text, label = 'Copied to clipboard!') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        window.showToast(label);
      }).catch(() => {
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  };

  function fallbackCopy(text, label) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    window.showToast(label);
  }
});
