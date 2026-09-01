/**
 * WebToolsX Terms of Use Blocking Modal & Cookie Manager
 * Enforces disclaimer acceptance with cookie + localStorage persistence.
 */
(function () {
  const COOKIE_NAME = "webtoolsx_terms_accepted";
  const COOKIE_DAYS = 365;

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
  }

  function isTermsAccepted() {
    try {
      if (localStorage.getItem(COOKIE_NAME) === "true") return true;
    } catch (e) {}
    return getCookie(COOKIE_NAME) === "true";
  }

  function acceptTerms() {
    try {
      localStorage.setItem(COOKIE_NAME, "true");
    } catch (e) {}
    setCookie(COOKIE_NAME, "true", COOKIE_DAYS);

    const modal = document.getElementById("webtoolsx-terms-overlay");
    if (modal) {
      modal.style.opacity = "0";
      modal.style.transition = "opacity 0.3s ease-out";
      setTimeout(() => {
        if (modal.parentNode) modal.parentNode.removeChild(modal);
        document.body.style.overflow = "";
      }, 300);
    }
  }

  function renderModal() {
    if (isTermsAccepted()) return;

    if (document.getElementById("webtoolsx-terms-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "webtoolsx-terms-overlay";
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.88);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      padding: 20px;
      box-sizing: border-box;
      animation: wtxTermsFadeIn 0.3s ease-out;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    `;

    overlay.innerHTML = `
      <style>
        @keyframes wtxTermsFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes wtxTermsPopIn {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .wtx-terms-card {
          max-width: 480px;
          width: 100%;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 20px;
          padding: 28px 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 25px rgba(2, 132, 199, 0.15);
          color: #f8fafc;
          text-align: center;
          animation: wtxTermsPopIn 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .wtx-terms-icon {
          width: 60px;
          height: 60px;
          background: rgba(2, 132, 199, 0.15);
          color: #38bdf8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          margin: 0 auto 16px;
          border: 1px solid rgba(56, 189, 248, 0.3);
        }
        .wtx-terms-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 12px 0;
        }
        .wtx-terms-body {
          font-size: 0.92rem;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 22px;
          text-align: left;
        }
        .wtx-terms-box {
          background: #0f172a;
          border-left: 4px solid #38bdf8;
          border-radius: 8px;
          padding: 12px 14px;
          margin-bottom: 16px;
        }
        .wtx-terms-box p {
          margin: 0;
          color: #e2e8f0;
          font-size: 0.88rem;
        }
        .wtx-terms-btn {
          width: 100%;
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          color: #ffffff;
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
        }
        .wtx-terms-btn:hover {
          opacity: 0.95;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(2, 132, 199, 0.5);
        }
      </style>
      <div class="wtx-terms-card">
        <div class="wtx-terms-icon">
          <i class="fas fa-shield-halved"></i>
        </div>
        <h3 class="wtx-terms-title">Terms of Use & Disclaimer</h3>
        
        <div class="wtx-terms-body">
          <div class="wtx-terms-box">
            <p><strong><i class="fas fa-exclamation-circle text-info me-1"></i> Use on your own responsibility:</strong> All WebToolsX utilities and calculations are provided on an as-is basis.</p>
          </div>
          <p style="margin-bottom: 10px;">We are continuously improving and fixing features. Please verify all calculation results independently before making financial or critical decisions.</p>
        </div>

        <button id="wtx-accept-btn" class="wtx-terms-btn">
          <i class="fas fa-check-circle me-1"></i> I Understand & Accept
        </button>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    document.getElementById("wtx-accept-btn").addEventListener("click", acceptTerms);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderModal);
  } else {
    renderModal();
  }
})();
