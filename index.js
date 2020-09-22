(async () => {
    function onScroll() {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight > scrollHeight - 10) {
            new Promise((resolve, reject) => {
                loadingElem.classList.remove("hidden");
                setTimeout(resolve, 800);
            }).then(() => {
                loadImages();
            });
        }
    }
    function loadImages() {
        photos.forEach(({ alt_description, urls: { full, raw, regular, small } }) => {
            const image = document.createElement('img');
            image.alt = alt_description;
            image.src = small;
            columns[columnsIndex].appendChild(image);
            columnsIndex++;
            if (columnsIndex == columns.length) {
                columnsIndex = 0;
            }
        });   
    }
    async function getPhotos() {
        const response = await fetch("./photos.json");
        const data = await response.json();
        return data;
    }
    const photos = await getPhotos();
    const columns = Array.from(document.querySelectorAll("div.column"));
    const loadingElem = document.querySelector("div.loading");
    let columnsIndex = 0;
    async function App() {  
        loadImages();
        document.onscroll = onScroll;
    }
    App();
})();
