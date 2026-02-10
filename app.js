// ===== 实时工资计算器 =====
class SalaryTracker {
    constructor() {
        this.monthlySalary = 15000;
        this.workDays = 22;
        this.startTime = '09:00';
        this.endTime = '18:00';
        this.dailySalary = 0;
        this.salaryPerSecond = 0;
        this.startTimestamp = null;
        this.intervalId = null;
        this.lastMilestone = 0;
        this.currentLanguage = 'zh';
        
        this.initElements();
        this.bindEvents();
        this.initAudio();
        this.initI18n();
        this.initVisitorCounter();
    }
    
    initElements() {
        // 设置面板元素
        this.settingsPanel = document.getElementById('settingsPanel');
        this.displayPanel = document.getElementById('displayPanel');
        this.monthlySalaryInput = document.getElementById('monthlySalary');
        this.startTimeInput = document.getElementById('startTime');
        this.endTimeInput = document.getElementById('endTime');
        this.workDaysInput = document.getElementById('workDays');
        this.startBtn = document.getElementById('startBtn');
        this.backBtn = document.getElementById('backBtn');
        
        // 语言选择器
        this.langSelect = document.getElementById('langSelect');
        
        // 特效元素
        this.coinContainer = document.getElementById('coinContainer');
        this.milestonePopup = document.getElementById('milestonePopup');
        
        // 展示面板元素
        this.workTimeDisplay = document.getElementById('workTimeDisplay');
        this.salaryDisplay = document.getElementById('salaryDisplay');
        this.currentAmount = document.getElementById('currentAmount');
        this.perSecond = document.getElementById('perSecond');
        this.progressPercent = document.getElementById('progressPercent');
        this.progressFill = document.getElementById('progressFill');
        this.dailyTarget = document.getElementById('dailyTarget');
        this.workedTime = document.getElementById('workedTime');
        this.remainingTime = document.getElementById('remainingTime');
        this.monthProgress = document.getElementById('monthProgress');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startTracking());
        this.backBtn.addEventListener('click', () => this.stopTracking());
        this.langSelect.addEventListener('change', (e) => this.changeLanguage(e.target.value));
    }
    
    initAudio() {
        // 创建音频上下文用于播放金币音效
        this.audioContext = null;
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('音频不支持');
        }
    }
    
    initI18n() {
        // 初始化国际化
        this.translate();
    }
    
    initVisitorCounter() {
        // 初始化访问统计
        this.visitorCountElement = document.getElementById('visitorCount');
        this.updateVisitorCount();
    }
    
    async updateVisitorCount() {
        try {
            // 尝试使用 CountAPI
            await this.updateVisitorCountWithAPI();
        } catch (error) {
            console.log('CountAPI 失败，使用本地存储:', error);
            // API 失败时使用本地存储
            this.updateVisitorCountWithLocalStorage();
        }
    }
    
    async updateVisitorCountWithAPI() {
        const key = 'salary-tracker-darling574';
        const apiUrl = `https://api.countapi.xyz`;
        
        // 增加访问计数
        await fetch(`${apiUrl}/hit/${key}`);
        
        // 获取当前计数
        const response = await fetch(`${apiUrl}/get/${key}`);
        const data = await response.json();
        
        if (data.value !== undefined) {
            this.displayVisitorCount(data.value);
        }
    }
    
    updateVisitorCountWithLocalStorage() {
        // 使用本地存储来统计访问量
        const storageKey = 'salary-tracker-visitors';
        
        // 获取当前计数
        let count = parseInt(localStorage.getItem(storageKey)) || 0;
        
        // 增加计数
        count += 1;
        
        // 保存到本地存储
        localStorage.setItem(storageKey, count.toString());
        
        // 显示计数
        this.displayVisitorCount(count);
    }
    
    displayVisitorCount(count) {
        if (this.visitorCountElement) {
            // 添加数字增长动画
            this.animateNumber(0, count, 1000);
        }
    }
    
    animateNumber(start, end, duration) {
        const element = this.visitorCountElement;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * progress);
            
            if (element) {
                element.textContent = current.toLocaleString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    changeLanguage(lang) {
        this.currentLanguage = lang;
        this.translate();
        
        // 如果正在跟踪，更新显示
        if (this.intervalId) {
            this.updateDisplayInfo();
            this.update();
        }
    }
    
    translate() {
        const lang = this.currentLanguage;
        const translations = i18n[lang];
        
        if (!translations) return;
        
        // 翻译所有带有 data-i18n 属性的元素
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key]) {
                el.textContent = translations[key];
            }
        });
        
        // 翻译占位符
        document.querySelectorAll('[data-placeholder]').forEach(el => {
            const key = el.getAttribute('data-placeholder');
            if (translations[key]) {
                el.placeholder = translations[key];
            }
        });
        
        // 更新页面标题
        document.title = translations.title || 'Salary Tracker';
    }
    
    // 播放金币音效
    playCoinSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // 设置音调 - 清脆的高音
        oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1800, this.audioContext.currentTime + 0.1);
        
        // 设置音量包络
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
        
        // 添加第二个音调增加层次感
        const oscillator2 = this.audioContext.createOscillator();
        const gainNode2 = this.audioContext.createGain();
        
        oscillator2.connect(gainNode2);
        gainNode2.connect(this.audioContext.destination);
        
        oscillator2.frequency.setValueAtTime(800, this.audioContext.currentTime);
        gainNode2.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        
        oscillator2.start(this.audioContext.currentTime);
        oscillator2.stop(this.audioContext.currentTime + 0.2);
    }
    
    startTracking() {
        // 获取输入值
        this.monthlySalary = parseFloat(this.monthlySalaryInput.value) || 15000;
        this.startTime = this.startTimeInput.value;
        this.endTime = this.endTimeInput.value;
        this.workDays = parseInt(this.workDaysInput.value) || 22;
        
        // 计算日薪和每秒薪资
        this.dailySalary = this.monthlySalary / this.workDays;
        this.salaryPerSecond = this.dailySalary / (9 * 3600); // 假设9小时工作制
        
        // 获取今天的上班时间戳
        const now = new Date();
        const [startHour, startMin] = this.startTime.split(':').map(Number);
        this.startTimestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMin, 0);
        
        // 如果已经过了上班时间，从当前时间开始计算
        if (now < this.startTimestamp) {
            this.startTimestamp = now;
        }
        
        // 更新显示
        this.updateDisplayInfo();
        
        // 切换面板
        this.settingsPanel.style.display = 'none';
        this.displayPanel.style.display = 'block';
        
        // 恢复音频上下文（浏览器自动播放策略）
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        // 启动实时更新
        this.update();
        this.intervalId = setInterval(() => this.update(), 100);
        
        // 重置里程碑
        this.lastMilestone = 0;
    }
    
    stopTracking() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        
        this.settingsPanel.style.display = 'block';
        this.displayPanel.style.display = 'none';
        
        // 清除金币
        this.coinContainer.innerHTML = '';
    }
    
    updateDisplayInfo() {
        const translations = i18n[this.currentLanguage];
        const currencySymbol = translations ? translations.currencySymbol : '¥';
        
        this.workTimeDisplay.textContent = `${this.startTime} - ${this.endTime}`;
        this.salaryDisplay.textContent = `${currencySymbol}${this.monthlySalary.toLocaleString()}`;
        this.dailyTarget.textContent = `${currencySymbol}${this.dailySalary.toFixed(2)}`;
        this.perSecond.textContent = `+${currencySymbol}${this.salaryPerSecond.toFixed(4)}/${translations ? (this.currentLanguage === 'en' ? 'sec' : '秒') : '秒'}`;
    }
    
    update() {
        const now = new Date();
        const [startHour, startMin] = this.startTime.split(':').map(Number);
        const [endHour, endMin] = this.endTime.split(':').map(Number);
        
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMin, 0);
        const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMin, 0);
        
        // 计算已工作时间（秒）
        let workedSeconds = 0;
        if (now > todayStart) {
            workedSeconds = Math.min((now - todayStart) / 1000, (todayEnd - todayStart) / 1000);
        }
        
        // 计算当前已赚金额
        const currentEarnings = workedSeconds * this.salaryPerSecond;
        
        // 计算工作时长
        const workedHours = Math.floor(workedSeconds / 3600);
        const workedMinutes = Math.floor((workedSeconds % 3600) / 60);
        const workedSecs = Math.floor(workedSeconds % 60);
        
        // 计算剩余时间
        const totalWorkSeconds = (todayEnd - todayStart) / 1000;
        const remainingSeconds = Math.max(0, totalWorkSeconds - workedSeconds);
        const remainingHours = Math.floor(remainingSeconds / 3600);
        const remainingMinutes = Math.floor((remainingSeconds % 3600) / 60);
        const remainingSecs = Math.floor(remainingSeconds % 60);
        
        // 计算进度
        const dayProgress = Math.min(100, (workedSeconds / totalWorkSeconds) * 100);
        
        // 计算本月进度
        const today = now.getDate();
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const monthProgressValue = Math.min(100, (today / daysInMonth) * 100);
        
        // 获取当前语言的货币符号
        const translations = i18n[this.currentLanguage];
        const currencySymbol = translations ? translations.currencySymbol : '¥';
        
        // 更新UI
        this.currentAmount.textContent = `${currencySymbol}${currentEarnings.toFixed(4)}`;
        this.workedTime.textContent = `${String(workedHours).padStart(2, '0')}:${String(workedMinutes).padStart(2, '0')}:${String(workedSecs).padStart(2, '0')}`;
        this.remainingTime.textContent = `${String(remainingHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:${String(remainingSecs).padStart(2, '0')}`;
        this.progressPercent.textContent = `${dayProgress.toFixed(1)}%`;
        this.progressFill.style.width = `${dayProgress}%`;
        this.monthProgress.textContent = `${monthProgressValue.toFixed(1)}%`;
        
        // 检查里程碑（每10元）
        const currentMilestone = Math.floor(currentEarnings / 10) * 10;
        if (currentMilestone > this.lastMilestone && currentMilestone > 0) {
            this.triggerMilestone(currentMilestone);
            this.lastMilestone = currentMilestone;
        }
    }
    
    triggerMilestone(amount) {
        // 播放音效
        this.playCoinSound();
        
        // 显示里程碑提示
        const translations = i18n[this.currentLanguage];
        const currencySymbol = translations ? translations.currencySymbol : '¥';
        const milestoneText = translations && translations.milestone 
            ? translations.milestone.replace('{amount}', amount)
            : `🎉 恭喜！已赚 ¥${amount}！`;
        
        this.milestonePopup.textContent = milestoneText;
        this.milestonePopup.classList.add('show');
        
        setTimeout(() => {
            this.milestonePopup.classList.remove('show');
        }, 2000);
        
        // 触发金币雨
        this.createCoinRain();
    }
    
    createCoinRain() {
        const coinCount = 15; // 金币数量
        
        for (let i = 0; i < coinCount; i++) {
            setTimeout(() => {
                this.createCoin();
            }, i * 100); // 错开掉落时间
        }
    }
    
    createCoin() {
        const coin = document.createElement('div');
        coin.className = 'coin';
        coin.textContent = '🪙';
        
        // 随机水平位置
        const startX = Math.random() * (window.innerWidth - 50);
        coin.style.left = `${startX}px`;
        
        // 随机大小
        const scale = 0.8 + Math.random() * 0.6;
        coin.style.fontSize = `${40 * scale}px`;
        
        // 随机动画时长
        const duration = 2 + Math.random() * 1.5;
        coin.style.animationDuration = `${duration}s`;
        
        this.coinContainer.appendChild(coin);
        
        // 动画结束后移除
        setTimeout(() => {
            coin.remove();
        }, duration * 1000);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new SalaryTracker();
});
