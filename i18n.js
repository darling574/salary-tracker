// 国际化配置
const i18n = {
    // 中文
    zh: {
        // 标题
        title: '💰 实时工资计算器',
        subtitle: '一看就很有钱',
        
        // 设置面板
        monthlySalary: '💵 月薪（元）',
        startTime: '🌅 上班时间',
        endTime: '🌙 下班时间',
        workDays: '📅 每月工作天数',
        startBtn: '🚀 开始赚钱',
        placeholderSalary: '例如：15000',
        placeholderWorkDays: '例如：22',
        
        // 展示面板
        backBtn: '← 返回设置',
        workTime: '⏰ 工作时间',
        salary: '💼 月薪',
        todayEarned: '今日已赚',
        perSecond: '+¥0.00/秒',
        todayProgress: '今日进度',
        todayTarget: '今日目标: ',
        workedTime: '已工作时间',
        remainingTime: '剩余时间',
        monthProgress: '本月进度',
        
        // 里程碑
        milestone: '🎉 恭喜！已赚 ¥{amount}！',
        
        // 货币符号
        currency: '¥',
        currencySymbol: '¥'
    },
    
    // 英文
    en: {
        // 标题
        title: '💰 Real-time Salary Tracker',
        subtitle: 'Looks Rich At First Glance',
        
        // 设置面板
        monthlySalary: '💵 Monthly Salary ($)',
        startTime: '🌅 Start Time',
        endTime: '🌙 End Time',
        workDays: '📅 Work Days Per Month',
        startBtn: '🚀 Start Earning',
        placeholderSalary: 'e.g.: 15000',
        placeholderWorkDays: 'e.g.: 22',
        
        // 展示面板
        backBtn: '← Back to Settings',
        workTime: '⏰ Work Time',
        salary: '💼 Monthly Salary',
        todayEarned: 'Today Earned',
        perSecond: '+$0.00/sec',
        todayProgress: 'Today Progress',
        todayTarget: 'Today Target: ',
        workedTime: 'Worked Time',
        remainingTime: 'Remaining Time',
        monthProgress: 'Month Progress',
        
        // 里程碑
        milestone: '🎉 Congratulations! Earned ${amount}!',
        
        // 货币符号
        currency: '$',
        currencySymbol: '$'
    },
    
    // 日语
    ja: {
        // 标题
        title: '💰 リアルタイム給与トラッカー',
        subtitle: '一見してお金持ち',
        
        // 设置面板
        monthlySalary: '💵 月給（円）',
        startTime: '🌅 出勤時間',
        endTime: '🌙 退勤時間',
        workDays: '📅 月間勤務日数',
        startBtn: '🚀 稼ぎ始める',
        placeholderSalary: '例: 15000',
        placeholderWorkDays: '例: 22',
        
        // 展示面板
        backBtn: '← 設定に戻る',
        workTime: '⏰ 勤務時間',
        salary: '💼 月給',
        todayEarned: '今日の収入',
        perSecond: '+¥0.00/秒',
        todayProgress: '今日の進捗',
        todayTarget: '今日の目標: ',
        workedTime: '勤務時間',
        remainingTime: '残り時間',
        monthProgress: '今月の進捗',
        
        // 里程碑
        milestone: '🎉 おめでとう！¥{amount} 稼ぎました！',
        
        // 货币符号
        currency: '¥',
        currencySymbol: '¥'
    },
    
    // 韩语
    ko: {
        // 标题
        title: '💰 실시간 급여 추적기',
        subtitle: '한눈에 부자 같다',
        
        // 设置面板
        monthlySalary: '💵 월급（원）',
        startTime: '🌅 출근 시간',
        endTime: '🌙 퇴근 시간',
        workDays: '📅 월간 근무일수',
        startBtn: '🚀 벌기 시작',
        placeholderSalary: '예: 15000',
        placeholderWorkDays: '예: 22',
        
        // 展示面板
        backBtn: '← 설정으로 돌아가기',
        workTime: '⏰ 근무 시간',
        salary: '💼 월급',
        todayEarned: '今日의 수입',
        perSecond: '+₩0.00/초',
        todayProgress: '今日의 진도',
        todayTarget: '今日의 목표: ',
        workedTime: '근무 시간',
        remainingTime: '남은 시간',
        monthProgress: '이번 달 진도',
        
        // 里程碑
        milestone: '🎉 축하합니다！₩{amount} 벌었어요！',
        
        // 货币符号
        currency: '₩',
        currencySymbol: '₩'
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = i18n;
} else {
    window.i18n = i18n;
}
