const DATA = [
    {
        subject: 'HTML5 Canvas',
        list: [
            {
                title: 'Wave Animation',
                entry: './example/html5-canvas/wave/index.html',
                reference: {
                    title: 'HTML5 Canvas Tutorial : 움직이는 웨이브 만들기',
                    author: 'Interactive Developer',
                    link: 'https://youtu.be/LLfhY4eVwDY'
                }
            },
            {
                title: 'Ripples Animation',
                entry: './example/html5-canvas/ripples/index.html',
                reference: {
                    title: 'HTML5 Canvas Tutorial : 자바스크립트로 컬러 추출해서 물결 효과 만들기',
                    author: 'Interactive Developer',
                    link: 'https://youtu.be/kpF0n39xXVM'
                }
            }
        ]
    },
    {
        subject: 'CSS',
        list: [
            {
                title: 'Water Wave Text Animation',
                entry: './example/css/wave-text/index.html',
                reference: {
                    title: 'Pure CSS3 Water Wave Text Animation Effects Using CSS Clip-path',
                    author: 'Online Tutorials',
                    link: 'https://youtu.be/Tf6qm5JMUXQ'
                }
            }
        ]
    }
];

const initData = () => {
    const body = document.querySelector('body');

    DATA.forEach((subjectData) => {
        const subjectDiv = document.createElement('div');
        subjectDiv.className = 'subject-wrap';
        const h3 = document.createElement('h3');
        h3.innerHTML = subjectData.subject;
        const ul = document.createElement('ul');
        subjectData.list.forEach((item) => {
            const li = document.createElement('li');
            const titleA = document.createElement('a');
            const refDesSpan = document.createElement('span');
            const refA = document.createElement('a');
            titleA.className = 'title';
            titleA.target = '_blank';
            titleA.href = item.entry;
            titleA.innerHTML = item.title;
            refDesSpan.className = 'ref-description';
            refA.target = '_blank';
            refA.href = item.reference.link;
            refA.innerHTML = item.reference.title;
            refDesSpan.appendChild(document.createTextNode('(ref: '));
            refDesSpan.appendChild(refA);
            refDesSpan.appendChild(document.createTextNode(` - ${item.reference.author})`));
            li.appendChild(titleA);
            li.appendChild(refDesSpan);
            ul.appendChild(li);
        });
        subjectDiv.appendChild(h3);
        subjectDiv.appendChild(ul);
        body.appendChild(subjectDiv);
    });
}

initData();

