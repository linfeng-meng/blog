export const isPC = (() => {
    let userAgentInfo = navigator.userAgent;
    let Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod",
        "XiaoMi/MiuiBrowser",
    ];
    let pc = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            pc = false;
            break;
        }
    }
    return pc && window.innerWidth > 750;
})(); 