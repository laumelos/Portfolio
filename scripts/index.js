
var currentPage = '';
loadPage('home.html');

var deviceSize = '';
function getDeviceSize(){
    if(window.innerWidth > 1036 || window.innerWidth > window.innerHeight){
        deviceSize = 'desktop';
    }else{
        deviceSize = 'mobile';
    }
}
getDeviceSize()

function loadPage(page){
    fetch(`pages/${page}`)
    .then(response => response.text())
    .then(html => {
    document.getElementById('main-content').innerHTML = html;
    loadPageFunctions();
    });
    currentPage = page;
}

function loadPageFunctions(){
    if(currentPage === 'home.html'){
        addCertificates();
        addProjects();
        addExperiences();
        addKnowledge()
        experiencesDetailAnimation();
    }
    if(currentPage === 'allProjects.html'){
        addProjects();
    }
    navAdjustments();
    window.scrollTo({ top: 0});
}

function loadProject(id){
    fetch(`pages/project.html`)
    .then(response => response.text())
    .then(html => {
    document.getElementById('main-content').innerHTML = html;
    const projectId = id;
    projectControl(projectId);
    navAdjustments();
    window.scrollTo({ top: 0});
    });

    currentPage = 'project.html';
}



//Mostra e esconde a barra de navegação dependendo da página atual
function navAdjustments(){
    if(currentPage === 'project.html' || currentPage === 'allProjects.html'){
        if(document.getElementById('nav').style.display !== 'none'){
            document.getElementById('nav').style.display = 'none';
        }
        if(document.querySelector('nav').style.justifyContent !== 'center'){
            document.querySelector('nav').style.justifyContent = 'center';
        }
    }else{
        if(deviceSize === 'desktop'){
            if(document.getElementById('nav').style.display !== 'flex'){
                document.getElementById('nav').style.display = 'flex';
            }
            if(document.querySelector('nav').style.justifyContent !== 'space-between'){
                document.querySelector('nav').style.justifyContent = 'space-between';
            }
        }
    }
}

//Direciona à sessão da página que foi clicada na nav bar
function navScroll(targetSection){
    const targetSectionId = document.getElementById(targetSection);
        
    targetSectionId.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}


const dataCertificates = [
    { image: 'url("images/certificates/CERTIFICADOneon.jpg")', data: '02/06/2023', title: 'Nordeste On 2023 - Sebrae' },
    { image: 'url("images/certificates/CERTIFICADOcodeceumaFigma.jpg")', data: '20/06/2023', title: 'Instrutora do módulo de Figma - CodeCeuma' },
    { image: 'url("images/certificates/CERTIFICADOnlwExperience.jpg")', data: '10/02/2024', title: 'NLW Expert trilha de HTML, CSS e Js - Rocketseat' },
    { image: 'url("images/certificates/CERTIFICADOimersaoFrontAlura.jpg")', data: '06/02/2024', title: 'Imersão Front-End Alura' }
];

// Função para criar e adicionar certificados à página
function addCertificates() {
    var certificatePosition = 0;
    const container = document.getElementById('certificate-container');
    const template = document.getElementById('certificate-template');

    dataCertificates.forEach((certificate, index) => {

        const clone = document.importNode(template.content, true);
        if(deviceSize === 'desktop') {
            clone.querySelector('.certificate').style.left = certificatePosition + 'px';
            certificatePosition += 40;
        }

        const img = clone.querySelector('.certificate-img');
        img.style.backgroundImage = certificate.image;

        const data = clone.querySelector('.certificate-data');
        data.textContent = certificate.data;

        const title = clone.querySelector('.certificate-title');
        title.textContent = certificate.title;

        if(deviceSize === 'desktop'){
        // Exibir o elemento certificate-info apenas no último certificado
            if (index === dataCertificates.length - 1) {
                clone.querySelectorAll('.certificate-info').forEach((certificateInfo) => {
                    certificateInfo.id = "last-certificate-info";
                    certificateInfo.style.display = 'flex';
                });
            }
        }else{
            clone.querySelectorAll('.certificate-info').forEach((certificateInfo) => {
                certificateInfo.style.display = 'flex';
            });
        }
        container.appendChild(clone);
    });
}

//Cria a animação dos certificados para desktop
function certificatesAnimation() {
    
    var certificateCLickDisabled = false;
    var certificateCount = 0;

    if (!certificateCLickDisabled){
        if (document.getElementById("certificate-container").classList.contains("certificate-close")){
            certificateCLickDisabled = true;
            //troca a classe certificate-container para open
            (document.getElementById("certificate-container").classList.remove("certificate-close"));
            (document.getElementById("certificate-container").classList.add("certificate-open"));

            document.getElementById("certificate-seta").style.transform = "scaleY(-1)"
            
            //esconde todos as informações dos certificados (o 0% de opacidade para a animação de mostrar o texto devagar depois)
            document.querySelectorAll('.certificate-info').forEach((certificateInfo) => {
                certificateInfo.style.opacity = '0%';
                certificateInfo.style.display = 'none';
                certificateInfo.style.display = 'flex';
            });

            //espera a animação do texto acontecer para mostrar as informações dos certificados
            setTimeout(function() {
                document.querySelectorAll('.certificate').forEach((certificate) => {
                    
                    //recomeça a contagem se já tiver 4 certificados na linha
                    if (certificateCount >= 100){
                        certificateCount = 0;
                    }
                    
                    certificate.style.flexDirection = 'column'; 
                    certificate.style.columnGap = 'unset'; 
                    certificate.style.rowGap = '1vw';
                    certificate.style.alignItems = 'unset';
                    
                    certificate.style.left = certificateCount + '%';   //posição temporária ainda com position absolut para efeito da animação
                    certificateCount += 25;

                    //espera a animação dos certificados acontecer para mostrar as informações dos certificados
                    setTimeout(function() {
                        certificate.style.position = 'unset'; //posição definitiva dos certifiados, não são mais position absolut
                        document.querySelectorAll('.certificate-info').forEach((certificateInfo) => {
                            certificateInfo.style.opacity = '100%'; 
                            certificateCLickDisabled = false;
                        });
                    }, 1000);
                });
            }, 500);
            return;
        }   
        //troca a classe certificados-container para close
        (document.getElementById("certificate-container").classList.remove("certificate-open"));
        (document.getElementById("certificate-container").classList.add("certificate-close"));

        document.getElementById("certificate-seta").style.transform = "scaleY(1)"

        document.querySelectorAll('.certificate-info').forEach((certificateInfo) => {
            certificateInfo.style.opacity = '0%';
            certificateInfo.style.display = 'none';
            certificateInfo.style.display = 'flex';
        });

        //espera a animação do texto acontecer para voltar os certificados para a posição inicial
        setTimeout(function() {
            document.querySelectorAll('.certificate').forEach((certificate) => {

                certificate.style.flexDirection = 'row'; 
                certificate.style.columnGap = '1vw'; 
                certificate.style.rowGap = 'unset';
                certificate.style.alignItems = 'center';
                certificate.style.position = 'absolute';

                certificate.style.left = certificateCount + 'px';
                certificateCount += 40;
                
                //espera a animação dos certificados acontecer para mostrar as informações do último certificado
                setTimeout(function() {
                    document.getElementById("last-certificate-info").style.opacity = '100%';
                    certificateCLickDisabled = false;
                }, 1000);
            });
        }, 500);
    }
}

const dataProjects = [
    { id:'0', image: 'images/projects/exp.jpg', title: 'Squad EXP', link: 'https://www.behance.net/gallery/164164103/EXP', description: 'Logo para time de desenvolvimento da Diretoria de Inovação e Tecnologia do Grupo CEUMA', category: 'design', technologies: 'figma,ai'},
    { id:'1', image: 'images/projects/foodcare.jpg', title: 'Food Care', link: 'https://www.behance.net/gallery/164151237/Food-Care', description: 'Identidade visual de uma marca de alimentação natural para pets', category: 'design', technologies: 'figma,ai'},
    { id:'2', image: 'images/projects/seloDaDiversidade.jpg', title: 'Selo da Diversidade', link: 'https://selodadiversidade.sedihpop.ma.gov.br/', description: 'Landing page e formulário para programa do Governo do Maranhão', category: 'dev', github: '', technologies: 'html ,css,js,php,sql,ui'},
    { id:'3', image: 'images/projects/ecoKo.jpg', title: 'EcoKo', link: 'https://www.linkedin.com/posts/laura-melo-91533222b_para-todos-os-donos-de-cachorros-voc%C3%AAs-j%C3%A1-activity-7089274365657137152-06Bi?utm_source=share&utm_medium=member_desktop', description: 'Projeto de design de identidade visual e de produto sustentável', category: 'design', technologies: 'figma,ai'},
    { id:'4', image: 'images/projects/quizNlw.png', video: 'images/projects/quizNlw.mp4', title: 'Quiz - NLW Experience', link: '', description: 'Projeto de um quiz desenvolvido durante a NLW Experience da Rocketseat, na trilha de HTML, CSS e JavaScript', category: 'dev', github:'https://github.com/laumelos/NLWexperience', technologies: 'html,css,js'},
    { id:'5', image: 'images/projects/universo_representacoes.jpg', title: 'Universo Representações', link: 'https://www.behance.net/gallery/201572409/Universo-Representacoes?', description: 'Logo para empresa de representação comercial', category: 'design', technologies: 'figma,ai'},
    { id:'6', image: 'images/projects/trabalhoJovem.png', title: 'Trabalho Jovem - Inscrição', link: 'https://formularioestudantil.trabalhojovem.ma.gov.br/', description: 'Formulário de inscrição para programa do Governo do Maranhão, que ao fim do período de inscrição contabilizou mais de 12 mil inscritos', category: 'dev', github: '', technologies: 'html,css,js,php,sql,ui,ux'},
    { id:'7', image: 'images/projects/portifolio.jpg', title: 'Meu portfólio', link: 'https://www.lauramelo.com.br', description: 'Portfólio pessoal, com o objetivo de apresentar minhas habilidades, experiências e projetos realizados', category: 'dev', github: 'https://github.com/laumelos/portfolio', technologies: 'html,css,js,ui,ux'},
    { id:'8', image: 'images/projects/theGoldenTribute.jpg', title: 'The Golden Tribute', link: 'https://www.behance.net/gallery/202870727/The-Golden-Tribute-Walls-and-Bridges?', description: 'Identidade visual da edição comemorativa de 50 anos do lançamento do álbum Walls and Bridges de John Lennon, envolvendo a criação de um novo disco de vinil, CD, materiais para divulgação, site, palco do show, figurino, entre outros', category: 'design', technologies: 'figma,ai'},
    { id:'8', image: 'images/projects/hoopgems.png', title: 'HoopGems', link: 'https://www.behance.net/gallery/207006789/HoopGems', description: 'Identidade visual de loja de vestuário focada em tênis estilosos e blusas de basquete, com estética esportiva e urbana', category: 'design', technologies: 'figma,ai'},
];

dataProjects.reverse();

// Função para criar e adicionar projetos à página
function addProjects() {
    const container = document.getElementById('projects-container');
    const template = document.getElementById('projects-template');
    
    dataProjects.forEach((project, index) => {
        const clone = document.importNode(template.content, true);

        const itemProject = clone.querySelector(".project");
        itemProject.addEventListener('click', function(){
            loadProject(project.id);
        })
        itemProject.id = project.id;

        const img = clone.querySelector('.project-img');
        img.src = project.image;

        const title = clone.querySelector('.project-title');
        title.textContent = project.title;

        const description = clone.querySelector('.project-description');
        description.textContent = project.description;

        clone.querySelector('.project').classList.add(project.category);

        //Mostra o botão de ver mais se tiver mais de cinco projetos
        if(index > 5 && (currentPage === 'home.html')){
            clone.querySelector('.project').style.display = "none";
            if (document.getElementById("more-projects-btn").style.display !== "flex"){
                document.getElementById("more-projects-btn").style.display = "flex"
            }
        }

        //Adiciona a tag de categoria apenas na página allProjects
        if(currentPage === 'allProjects.html'){
            const category = clone.querySelector('.project-category');
            category.textContent = project.category;
        }
        container.appendChild(clone);
    });
}

//Controla a funcionamento da página individual do projeto
function projectControl(projectId) {
    //Procura no array dataProjects o primeiro elemento com id igual ao projectID
    const project = dataProjects.find(p => p.id === projectId);

    const title = document.getElementById('project-info-title');
    const image = document.getElementById('project-info-img');
    const video = document.getElementById('project-info-video');
    const description = document.getElementById('project-info-description');
    const techs = project.technologies.split(",");
    const button = document.getElementById('project-button');
    const githubButton = document.getElementById('project-github-button');
    const privateProjectMessage = document.getElementById('private-project-message');
    
    if (project.video){
        video.src = project.video;
        video.style.display = 'flex';
        image.style.display = 'none';
    }

    image.src = project.image;
    title.textContent = project.title;
    description.textContent = project.description;
    githubButton.href = project.github;

    if (project.link == ''){
        button.style.display = 'none';
    }else{
        button.style.display = 'flex'
        button.href = project.link;
    }

    //Cria os ícones de tecnologias usadas no projeto
    techs.forEach((tech) => {
        tech = tech.trim();
        var technologiesImg = document.createElement('img');
        technologiesImg.classList.add("item-knowledge");
        technologiesImg.classList.add("item-knowledge-project-page");
        imageSrc = "images/technologies/" + tech + "-icon.svg";
        technologiesImg.src = imageSrc;

        document.getElementById("technologies-container").appendChild(technologiesImg);
    })

    //Mostra o botão de acesso ao github apenas se o projeto for se desenvolvimento
    if(project.category=='design' && githubButton.style.display !== 'none'){
        githubButton.style.display = 'none';
    }else{
        //Mostra o botão do github bloqueado se for um projeto de desenvolvimento sem link
        if(project.github == '' || !project.github){
            githubButton.firstElementChild.src = 'images/logo-github-blocked.svg';
            githubButton.style.backgroundColor = 'var(--gray)';
            githubButton.style.cursor = 'default';
            githubButton.style.pointerEvents = 'none';
            privateProjectMessage.style.display = 'flex';
        }
        githubButton.style.display = 'flex';
    }
}

function changeProjectCategory(element, category){
    var visibleProjects = 0;
    
    for(var i=0; i<document.querySelectorAll(".category").length; i++){
        if (document.querySelectorAll(".category")[i].classList.contains("selected")){
            document.querySelectorAll(".category")[i].classList.remove("selected");
            element.classList.add("selected");
        }
    }
    document.querySelectorAll(".project").forEach((project, index) => {

        if((project.classList.contains(category) || category == "all") && (((currentPage === 'home.html') && visibleProjects <=5) || currentPage === 'allProjects.html')){
            project.style.display = "flex";
            visibleProjects +=1; 
        }
        else{
            project.style.display = "none";
        }
    });
    if(currentPage === 'home.html'){
        if (visibleProjects <= 5){
            if (document.getElementById("more-projects-btn").style.display !== "none")
            document.getElementById("more-projects-btn").style.display = "none"
        }else{
            document.getElementById("more-projects-btn").style.display = "flex"
        }
    }
}

const dataExperiences = [
    { title: 'Loja online - Sunflora', date: '2020 - 2021', description: 'Início da jornada empreendedora aos 16 anos, criando e gerenciando uma loja online'},
    { title: 'Social Media do Oxygeni Hub - Hub de Inovação do Grupo Ceuma', date: '2021.2 - 2022.2', description: 'Design de posts para as mídias sociais e criação de identidades visuais para projetos'},
    { title: 'Estagiária na Diretoria de Inovação e Tecnologia do Grupo Ceuma', date: '2021 - 2023.1', description: 'Criação do design system para aplicações e de marcas e identidades visuais para projetos e produção para mídias sociais'},
    { title: 'Incode Tech School', date: '2022.2, 2023.1 e 2024', description: 'Instrutora do módulo de design na Incode Tech School do Oxygeni Hub em parceria com a Universidade Ceuma'},
    { title: 'ATI - Agência de Tecnologia da Informação do Governo do MA', date: '2023.2 - atual', description: 'Desenvolvimento Front-End e design UI/UX de páginas de projetos do Governo do Estado do MA'}
];

// Função para criar e adicionar experiências à página
function addExperiences() {
    const container = document.getElementById('experiences-container');
    const template = document.getElementById('experiences-template');

    dataExperiences.forEach((experience) => {

        const clone = document.importNode(template.content, true);

        const title = clone.querySelector('.experience-title');
        title.textContent = experience.title;

        const date = clone.querySelector('.experience-date');
        date.textContent = experience.date;

        const description = clone.querySelector('.experience-description');
        description.textContent = experience.description;

        container.appendChild(clone);
    });
}

function experiencesDetailAnimation(){
    document.querySelectorAll(".work-icon").forEach((workIcon) => {

        
        workIcon.parentNode.addEventListener("mouseover", function(){
            activeEperienceDetail(workIcon)
        });
        workIcon.parentNode.addEventListener("click", function(){
            activeEperienceDetail(workIcon)
        });
        
        workIcon.parentNode.addEventListener("mouseout", function() {
            workIcon.src = "images/work-icon.svg";
            workIcon.parentElement.querySelector(".experience-detail-small").classList.remove("experience-detail-active");
        });
        
    });
}

function activeEperienceDetail(workIcon){
    workIcon.src = "images/work-icon-selected.svg";
    workIcon.parentElement.querySelector(".experience-detail-small").classList.add("experience-detail-active");
}

const dataKnowledge = [
    { id:'0', completed:'y', title:'HTML', image:'images/technologies/html-icon.svg', text: 'HTML é a linguagem de marcação usada para estruturar conteúdos na web, definindo elementos como parágrafos, links e imagens.'},
    { id:'1', completed:'y', title:'CSS', image:'images/technologies/css-icon.svg', text: 'CSS é uma linguagem de folha de estilos utilizada para estilizar a aparência dos elementos HTML, como cores, fontes e layout.'},
    { id:'2', completed:'y', title:'JS', image:'images/technologies/js-icon.svg', text: 'JavaScript é uma linguagem de programação que permite adicionar interatividade, lógica e funcionalidades dinâmicas aos websites.'},
    { id:'3', completed:'y', title:'UI', image:'images/technologies/ui-icon.svg', text: 'UI (User Interface) refere-se à interface visual e interativa através da qual os usuários interagem com o produto, incluindo elementos como layout, design e usabilidade.'},
    { id:'4', completed:'y', title:'Figma', image:'images/technologies/figma-icon.svg', text: 'Figma é uma ferramenta de design de interface e prototipagem baseada na nuvem, amplamente utilizada para criar designs de UI e UX.'},
    { id:'5', completed:'y', title:'Illustrator', image:'images/technologies/ai-icon.svg', text: 'Adobe Illustrator é um software de design gráfico vetorizado, usado principalmente para a criação de gráficos, logos e ilustrações.'},
    { id:'6', completed:'y', title:'Tailwind', image:'images/technologies/tailwind-icon.svg', text: 'Tailwind CSS é um framework de design utilitário que permite estilizar elementos HTML usando classes pré-definidas.'},
    { id:'7', completed:'n', title:'React Js', image:'images/technologies/react-icon.svg', text: '*Aprendendo...* <br> React é uma biblioteca JavaScript usada para construir interfaces de usuário interativas e eficientes com componentes reutilizáveis que gerenciam seu próprio estado.'},
    { id:'8', completed:'n', title:'PHP', image:'images/technologies/php-icon.svg', text: '*Aprendendo...* <br> PHP é uma linguagem de script usada para criar páginas web dinâmicas, interagir com bancos de dados e processar formulários, embutida no HTML para gerar conteúdo personalizado.'},
    { id:'9', completed:'n', title:'SQL', image:'images/technologies/sql-icon.svg', text: '*Aprendendo...* <br> SQL é uma linguagem de programação usada para gerenciar e manipular bancos de dados, permitindo consultas, inserções e atualizações de dados.'}
];

let currentTimeout;

// Função para criar e adicionar conhecimentos à página
function addKnowledge() {
    const itemKnowledgeInfoDefault = document.getElementById('tech-info').innerHTML;
    const itemKnowledgeInfo = document.getElementById('tech-info');
    const container = document.getElementById('item-knowledge-container');
    const template = document.getElementById('item-knowledge-template');

    dataKnowledge.forEach((itemKnowledge) => {
        const clone = document.importNode(template.content, true);

        const image = clone.querySelector('.icon-default');
        image.src = itemKnowledge.image;

        const item = clone.querySelector('.item-knowledge');
        item.id = itemKnowledge.id;

        if (itemKnowledge.completed == 'n'){
            item.style.opacity = '50%';
        }

        var itemKnowledgeText;

        if(deviceSize === 'desktop'){
            item.addEventListener("mouseover", function() {
                itemKnowledgeText = dataKnowledge.find(p => p.id === this.id);
                itemKnowledgeInfo.innerHTML = itemKnowledgeText.text;
            });
            item.addEventListener("mouseout", function() {
                itemKnowledgeInfo.innerHTML = itemKnowledgeInfoDefault;
            });
        }else{
            item.addEventListener("click", function() {
                const itemKnowledgeText = dataKnowledge.find(p => p.id === this.id);
                itemKnowledgeInfo.innerHTML = itemKnowledgeText.text;

                if (currentTimeout) {
                    clearTimeout(currentTimeout);
                }

                currentTimeout = setTimeout(() => {
                    itemKnowledgeInfo.innerHTML = itemKnowledgeInfoDefault;
                    currentTimeout = null; // Reseta o temporizador
                }, 10000);
            });
        }
        container.appendChild(clone);
    });
}



