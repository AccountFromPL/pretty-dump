window.onload = function () {
    let frames = document.getElementsByTagName("pre");
    let indentGuide = '<div class="indent-guide"></div>';
    let cssId = 'pretty-dump-css';
    if (!document.getElementById(cssId)) {
        let head = document.getElementsByTagName('head')[0];
        let link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = '//cdn.jsdelivr.net/gh/AccountFromPL/pretty-dump@master/pretty-dump.css';
        link.media = 'all';
        head.appendChild(link);
    }
    Object.keys(frames).forEach(function (frame) {
        let code = frames[frame].innerHTML.split("\n");
        frames[frame].innerHTML = "";
        Object.keys(code).forEach(function (_code) {
            let span = document.createElement("span");
            if (code[_code] !== "" && _code != code.length) {
                let codeInsert = code[_code];
                if(codeInsert.match(/^ {4,}/)) {
                    let countSpaces = codeInsert.search(/\S/);
                    if(0 === countSpaces % 2) {
                        codeInsert = codeInsert.replace(/^ {4}/gm, `  ${indentGuide}  `);
                        codeInsert = codeInsert.replace(/[ |>] {4}/g, `  ${indentGuide}  `);
                    }
                }
                span.innerHTML = codeInsert;
                frames[frame].appendChild(span);
            }
        });
    });
}
