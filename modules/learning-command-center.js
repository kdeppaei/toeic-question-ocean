(function(){
  function percent(stat){
    return stat && stat.total ? Math.round(stat.correct / stat.total * 100) : 0;
  }

  function weakestStrategy(performance){
    const strategies = Object.values(performance?.strategies || {})
      .filter(stat => stat.total >= 3)
      .sort((a, b) => percent(a) - percent(b) || b.total - a.total);
    return strategies[0] || null;
  }

  function weakestCategory(performance){
    const categories = Object.entries(performance?.categories || {})
      .filter(([, stat]) => stat.total >= 3)
      .sort((a, b) => percent(a[1]) - percent(b[1]) || b[1].total - a[1].total);
    if (!categories[0]) return null;
    return { name: categories[0][0], ...categories[0][1] };
  }

  function buildStudyMissions(input){
    const missions = [];
    const strategy = weakestStrategy(input.performance);
    const category = weakestCategory(input.performance);

    if (input.dueCount > 0) {
      missions.push({
        tone: "urgent",
        title: "先清今日到期複習",
        detail: `${input.dueCount} 題已到複習日，先用間隔複習把記憶拉回來。`,
        cta: "開始複習",
        action: "dueReview"
      });
    }

    if (strategy) {
      missions.push({
        tone: "primary",
        title: `補強技巧：${strategy.title}`,
        detail: `目前 ${percent(strategy)}%（${strategy.correct}/${strategy.total}），建議做一回合技巧專練。`,
        cta: "看技巧分析",
        action: "analytics"
      });
    } else if (category) {
      missions.push({
        tone: "primary",
        title: `補強考點：${category.name}`,
        detail: `目前 ${percent(category)}%（${category.correct}/${category.total}），適合安排 10 題同類型練習。`,
        cta: "看弱點分析",
        action: "analytics"
      });
    }

    if (input.wrongCount >= 8) {
      missions.push({
        tone: "warning",
        title: "錯題本需要整理",
        detail: `目前累積 ${input.wrongCount} 題，建議先重練錯題再增加新題量。`,
        cta: "打開錯題本",
        action: "wrongBook"
      });
    }

    if (input.vocabCount < 20) {
      missions.push({
        tone: "calm",
        title: "建立高頻單字基底",
        detail: "從題庫單字庫挑 10 個高出現率單字加入個人單字本。",
        cta: "看題庫單字",
        action: "autoVocab"
      });
    }

    if (input.qualityCount > 0) {
      missions.push({
        tone: "admin",
        title: "處理題目品質佇列",
        detail: `${input.qualityCount} 筆品質標記正在追蹤，可複查爭議或停用題。`,
        cta: "進入後台",
        action: "quality"
      });
    }

    if (!missions.length) {
      missions.push({
        tone: "primary",
        title: "今天先完成一回合練習",
        detail: `目前題庫 ${input.bankCount} 題，建議先做 20 題混合練習累積分析資料。`,
        cta: "設定練習",
        action: "practice"
      });
    }

    missions.push({
      tone: "roadmap",
      title: "本週產品化目標",
      detail: "完成 3 回合練習、1 次錯題複習、1 次單字複習，讓弱點分析更可靠。",
      cta: "查看總覽",
      action: "home"
    });

    return missions.slice(0, 4);
  }

  window.TOEIC_LEARNING_COMMAND_CENTER = {
    buildStudyMissions
  };
})();
