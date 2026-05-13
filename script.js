// script.js
document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});

// 在 script.js 的末尾加上这段表单提交逻辑

const contactForm = document.getElementById('myForm');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // 阻止表单默认的跳转行为，这叫 Seamless UI 懂吗笨蛋！
        
        // 改变按钮状态，假装在加载
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;

        // 获取填写的资料
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // 打包数据
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);

        // 🛑 把下面这行换成你自己的 Google Web App URL！
        const scriptURL = 'https://script.google.com/macros/s/AKfycby_2oxtYjGLoMxtciuRhbtPhBQ9biqpR_JJrzI7y-uY9MnM0tuqovZEj_Vogq8lVrgFkw/exec';

        // 发送数据到 Google Sheet (使用 no-cors 绕过烦人的跨域限制)
        fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors'})
            .then(() => {
                // 提交成功后，无情地把他一脚踢到成功页面！
                window.location.href = 'success.html'; 
            })
            .catch(error => {
                console.error('Error!', error.message);
                submitBtn.innerText = 'Error! Try Again.';
                submitBtn.style.background = '#ef4444'; // 变成失败红
                submitBtn.disabled = false;
            });
    });
}