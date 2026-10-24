// ================================================================
//  ENDLOVUKAZI HIGH SCHOOL — FORM SUBMISSION SCRIPT
//  File: script EHS.js
//  Spreadsheet: EHS Applications
// ================================================================

// ----------------------------------------------------------------
//  ⚠️ STEP 1: REPLACE THIS URL WITH YOUR DEPLOYED APPS SCRIPT URL
//  It must end with /exec
// ----------------------------------------------------------------
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXHZmAKgbMfaOFycXMG2kfd6cYkPrZML3ZVn87uoyVjzncv2nBOIRR1eOfB8rycW3ZXw/exec';

// ----------------------------------------------------------------
//  Main submission logic
// ----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {

  const form      = document.getElementById('regForm');
  const feedback  = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  // ---- Show feedback message ----
  function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = (type === 'success') ? 'feedback-success' : 'feedback-error';

    if (type === 'success') {
      setTimeout(() => {
        feedback.textContent = '';
        feedback.className = '';
      }, 7000);
    }
  }

  // ---- Clear feedback ----
  function clearFeedback() {
    feedback.textContent = '';
    feedback.className = '';
  }

  // ---- Handle form submit ----
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearFeedback();

    // ---- Grab values ----
    const fullNames     = document.getElementById('fullNames').value.trim();
    const surname       = document.getElementById('surname').value.trim();
    const age           = document.getElementById('age').value.trim();
    const idNumber      = document.getElementById('idNumber').value.trim();
    const nationality   = document.getElementById('nationality').value.trim();
    const homeAddress   = document.getElementById('homeAddress').value.trim();
    const gender        = document.getElementById('gender').value;
    const race          = document.getElementById('race').value;
    const grade         = document.getElementById('grade').value;
    const dob           = document.getElementById('dob').value;
    const parentFullNames = document.getElementById('parentFullNames').value.trim();
    const parentSurname   = document.getElementById('parentSurname').value.trim();
    const relationship    = document.getElementById('relationship').value.trim();
    const contactNumber   = document.getElementById('contactNumber').value.trim();

    // ---- Basic validation ----
    if (!fullNames || !surname || !idNumber || !contactNumber) {
      showFeedback('⚠️ Please fill in all required fields (Full Names, Surname, ID Number, Contact Number).', 'error');
      return;
    }

    // ---- Build data object (keys match Apps Script) ----
    const formData = {
      timestamp:       new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' }),
      fullNames:       fullNames,
      surname:         surname,
      age:             age,
      idNumber:        idNumber,
      nationality:     nationality,
      homeAddress:     homeAddress,
      gender:          gender,
      race:            race,
      grade:           grade,
      dob:             dob,
      parentFullNames: parentFullNames,
      parentSurname:   parentSurname,
      relationship:    relationship,
      contactNumber:   contactNumber
    };

    // ---- Disable button ----
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i> Submitting...';

    try {
      // ---- Send to Apps Script ----
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode:   'no-cors',              // required for Apps Script
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body:   JSON.stringify(formData)
      });

      // With no-cors we can't read the response — assume success if no network error
      showFeedback('✅ Registration submitted successfully!', 'success');
      form.reset();

    } catch (err) {
      console.error('Submission error:', err);
      showFeedback('❌ Submission failed. Please check your internet connection and try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane" style="margin-right:8px;"></i> Submit Registration';
    }
  });

});
