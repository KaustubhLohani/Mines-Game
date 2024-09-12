document.addEventListener('DOMContentLoaded',()=>{
    const grid = document.getElementById('grid');
    const startButton=document.getElementById('start-button');
    const resetButton= document.getElementById('reset-button');
    const mineCountInput=document.getElementById('mine-count');
    const heading1 = document.getElementById('heading1');
    const heading2 = document.getElementById('heading2');
    const bombImage = document.getElementById('bomb-image');
    const gridSize=5;
    let tiles=[];
    let mineCount=5;
    const clickSound = document.getElementById('click-sound');
    const explosionSound = document.getElementById('explosion-sound');


startButton.addEventListener('click',()=>{
    mineCount=parseInt(mineCountInput.value);
    createGrid();

    heading1.style.fontSize = '50px'; 
    heading2.style.fontSize = '50px'; 
    heading1.style.margin = '10px 0'; 
    heading2.style.margin = '10px 0'; 
    bombImage.style.width = '100px'; 
    bombImage.style.margin = '5px 0'; 
});

function createGrid(){
    grid.innerHTML='';
    tiles=[];
    const mineIndices= generateMineIndices();

    for(let i =0;i<gridSize*gridSize;i++){
        const tile=document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.index=i;
        if(mineIndices.includes(i)){
            tile.dataset.mine='true';
        }
        else{
            tile.dataset.diamond='true';
        }
        tile.addEventListener('click',revealTile);
        grid.appendChild(tile);
        tiles.push(tile);
    }
}

function generateMineIndices() {
    const indices = [];
    while (indices.length < mineCount) {
        const randomIndex = Math.floor(Math.random() * gridSize * gridSize);
        if (!indices.includes(randomIndex)) {
            indices.push(randomIndex);
        }
    }
    return indices;
}

function revealTile(event) {
    const tile = event.target;
    if (tile.classList.contains('revealed')) return;

    clickSound.play();

    tile.classList.add('revealed');
    if (tile.dataset.mine === 'true') {
        
        revealAllMines();
        
        explosionSound.play();
        
        explosionSound.onended = () => {
            setTimeout(() => {
                alert('Boom! You hit a mine. Game Over!');
            }, 1); // Delay to ensure sound has started
        };

    } else {
        tile.classList.add('diamond');
        tile.textContent = '💎';
    }
}

function revealAllMines(){
    tiles.forEach(tile => {
        if (tile.dataset.mine === 'true') {
            tile.classList.add('revealed');
            tile.classList.add('mine');
            tile.textContent = '💣';
        }

        tile.removeEventListener('click', revealTile);
    });
}

// Reset the game
resetButton.addEventListener('click',()=>{
    mineCount=parseInt(mineCountInput.value);
    createGrid();
});

});
