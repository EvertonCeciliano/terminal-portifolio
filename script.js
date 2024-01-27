document.addEventListener('DOMContentLoaded', function() {
    const menuOptions = document.querySelectorAll('.menu-option');
    const output = document.getElementById('output');

    let currentSection = '';
    let typing = false;
    let selectedOption = 0;

    menuOptions[selectedOption].classList.add('selected');

    menuOptions.forEach((option, index) => {
        option.addEventListener('click', function() {
            const command = option.textContent.substring(2).toLowerCase();
            typeText(command);
        });
    });

    document.addEventListener('keydown', function(event) {
        if (!typing) {
            if (event.key === 'ArrowUp' && selectedOption > 0) {
                updateSelectedOption(-1);
            } else if (event.key === 'ArrowDown' && selectedOption < menuOptions.length - 1) {
                updateSelectedOption(1);
            }
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            const command = menuOptions[selectedOption].textContent.substring(2).toLowerCase();
            typeText(command);
        }
    });

    function updateSelectedOption(delta) {
        menuOptions[selectedOption].classList.remove('selected');
        selectedOption += delta;
        menuOptions[selectedOption].classList.add('selected');
    }

    function typeText(text) {
        typing = true;
        const speed = 150;
        let index = 0;

        function type() {
            if (index < text.length) {
                output.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else {
                typing = false;
                processCommand(text.toLowerCase());
            }
        }

        type();
    }

    function processCommand(command) {
        switch (command) {
            case 'sobre mim':
                displayContent('Me chamo Everton Ceciliano ', 'Sou um programador apaixonado pelo desenvolvimento de software, atualmente cursando Análise e Desenvolvimento de Sistemas. Durante meus estudos, explorei frameworks e bibliotecas de JavaScript, com ênfase em programação web, especialmente em Reactjs. Destaco-me pela versatilidade, habilidade no trabalho em equipe e comunicação eficaz.');
                break;
            case 'projetos':
                displayContent('Projetos feitos por mim', 
                    '> Projeto 1: Pokédex<br>  Descrição: Uma Pokédex que permite procurar um Pokémon pelo ID ou nome.<br>  Link: <a href="https://evertonceciliano.github.io/pokedex/" target="_blank">Pokedex</a><br>' +
                    '<br>' +
                    '> Projeto 2: Explorer<br>  Descrição: Landing page baseada no design disponível no Figma. O objetivo é criar uma experiência de exploração sem limites, incorporando algumas alterações ao design original.<br>  Link: <a href="https://evertonceciliano.github.io/explorer-page/" target="_blank">Explorer</a><br>'
                );
                break;
            case 'contatos':
                displayContent('Contate-me', '> GitHub: <a href="https://github.com/EvertonCeciliano" target="_blank">https://github.com/EvertonCeciliano</a><br>> Email: <a href="mailto:evertoncecilianosouza@gmail.com" target="_blank">evertoncecilianosouza@gmail.com</a><br>> LinkedIn: <a href="https://www.linkedin.com/in/evertonceciliano" target="_blank">www.linkedin.com/in/evertonceciliano</a>');
                break;
        }
    }

    function displayContent(title, content) {
        output.innerHTML += '<div style="color: red;">' + title + '</div>';
        
        // Transforma o conteúdo em HTML e exibe apenas o texto da URL
        const parsedContent = content.replace(/::/g, '<br>').replace(/\bLink: <a href="(.*?)" target="_blank">(.*?)<\/a>/g, '$2: $1');
        
        output.innerHTML += '<div>' + parsedContent + '</div>';
        
        // Adiciona uma quebra de linha após cada seção
        output.innerHTML += '<br>';
        
        currentSection = title.toLowerCase();
    }
});
