// DOM元素获取
const birthDateInput = document.getElementById('birthDate');
const targetDateInput = document.getElementById('targetDate');
const calculateBtn = document.getElementById('calculateBtn');
const resultSection = document.getElementById('resultSection');
const birthDisplay = document.getElementById('birthDisplay');
const targetDisplay = document.getElementById('targetDisplay');
const daysCount = document.getElementById('daysCount');

// 设置默认日期为今天
function setDefaultDates() {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    // 设置目标日期为今天
    targetDateInput.value = todayString;
    
    // 设置默认出生日期为30年前
    const thirtyYearsAgo = new Date();
    thirtyYearsAgo.setFullYear(today.getFullYear() - 30);
    const thirtyYearsAgoString = thirtyYearsAgo.toISOString().split('T')[0];
    birthDateInput.value = thirtyYearsAgoString;
}

// 格式化日期显示
function formatDateDisplay(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
}

// 计算天数差
function calculateDaysBetween(startDate, endDate) {
    // 清除时间部分，只比较日期
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    
    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    return daysDiff;
}

// 验证日期输入
function validateDates() {
    const birthDate = birthDateInput.value;
    const targetDate = targetDateInput.value;
    
    if (!birthDate || !targetDate) {
        alert('请选择出生日期和目标日期！');
        return false;
    }
    
    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    
    if (birth > target) {
        alert('目标日期不能早于出生日期！');
        return false;
    }
    
    return true;
}

// 显示结果动画
function showResultAnimation(days) {
    let current = 0;
    const increment = Math.ceil(days / 50); // 控制动画速度
    const timer = setInterval(() => {
        current += increment;
        if (current >= days) {
            current = days;
            clearInterval(timer);
        }
        daysCount.textContent = current.toLocaleString();
    }, 20);
}

// 计算按钮点击事件
calculateBtn.addEventListener('click', function() {
    if (!validateDates()) return;
    
    const birthDate = birthDateInput.value;
    const targetDate = targetDateInput.value;
    
    const days = calculateDaysBetween(birthDate, targetDate);
    
    // 更新显示内容
    birthDisplay.textContent = formatDateDisplay(birthDate);
    targetDisplay.textContent = formatDateDisplay(targetDate);
    
    // 显示结果区域
    resultSection.style.display = 'block';
    
    // 开始数字动画
    showResultAnimation(days);
});

// 回车键支持
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateBtn.click();
    }
});

// 输入框变化时隐藏结果区域
birthDateInput.addEventListener('change', function() {
    resultSection.style.display = 'none';
});

targetDateInput.addEventListener('change', function() {
    resultSection.style.display = 'none';
});

// 页面加载时设置默认日期
document.addEventListener('DOMContentLoaded', function() {
    setDefaultDates();
    
    // 添加加载动画效果
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
});

// 添加一些实用功能

// 快速选择常用日期
function addQuickDateButtons() {
    const quickDates = [
        { name: '今天', days: 0 },
        { name: '本周', days: 6 },
        { name: '本月', days: 29 },
        { name: '今年', days: 364 }
    ];
    
    const quickDateContainer = document.createElement('div');
    quickDateContainer.className = 'quick-dates';
    quickDateContainer.innerHTML = '<p style="margin-bottom: 10px; color: #4caf50;">快速选择：</p>';
    
    quickDates.forEach(date => {
        const button = document.createElement('button');
        button.textContent = date.name;
        button.className = 'quick-date-btn';
        button.addEventListener('click', function() {
            const today = new Date();
            const targetDate = new Date();
            targetDate.setDate(today.getDate() + date.days);
            targetDateInput.value = targetDate.toISOString().split('T')[0];
            resultSection.style.display = 'none';
        });
        quickDateContainer.appendChild(button);
    });
    
    const inputSection = document.querySelector('.input-section');
    inputSection.appendChild(quickDateContainer);
}

// 添加快速选择按钮
addQuickDateButtons();

// 添加额外的CSS样式给快速选择按钮
const quickDateStyle = document.createElement('style');
quickDateStyle.textContent = `
    .quick-dates {
        margin-top: 20px;
        text-align: center;
    }
    
    .quick-date-btn {
        background: #81c784;
        color: white;
        border: none;
        padding: 8px 16px;
        margin: 0 5px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.3s ease;
    }
    
    .quick-date-btn:hover {
        background: #4caf50;
        transform: translateY(-1px);
    }
`;

document.head.appendChild(quickDateStyle);