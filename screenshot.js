
/*
*  (c) Richard franklin c
*
*/
//get screenshot from dom
let getPlayingScreenshot = (event) => {
    let video = document.getElementsByTagName('video')[0];
    if(video){
        const reader = new FileReader();
        //the new image quality minimum = 0, maximum = 1;
        const REDUCE_RATIO = 1;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        ctx.canvas.toBlob((blob) => {
            const newFile = new File([blob], 'testing', {
                type : 'image/jpeg',
                lastModified : Date.now(),
            });
            const reader2 = new FileReader();
            reader2.addEventListener('loadend', (e) => {
                const newFileSrc = e.target.result;
                preview2.src = newFileSrc;
            });
            reader2.readAsDataURL(newFile);
        }, 'image/jpeg', REDUCE_RATIO);
    }
}
//get screenshot from input
let getScreenshot = (inputElement, captureArea) => {
    const file = inputElement.files[0];
    if(file){
        const reader = new FileReader();
        // the new image quality minimum = 0, maximum = 1;
        const REDUCE_RATIO = 1;
        reader.addEventListener('loadend', (event) => {
            let video = document.createElement('video');
            video.src = event.target.result;
            video.controls = true;
            video.currentTime = 5;

            video.onloadedmetadata = () => {
                video.currentTime = captureArea == 0 ? 5 : ( captureArea == 1 ? video.duration / 2 : video.duration - 5);
            }
        
             video.oncanplay = () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0);
                ctx.canvas.toBlob((blob) => {
                    const newFile = new File([blob], 'testing', {
                        type : 'image/jpeg',
                        lastModified : Date.now(),
                    });
                    const reader2 = new FileReader();
                    reader2.addEventListener('loadend', (e) => {
                        hideSpinners();
                        const newFileSrc = e.target.result;
                        preview2.src = newFileSrc;
                        preview1.appendChild(video);
                        video.oncanplay = undefined;
                    });
                    reader2.readAsDataURL(newFile);
                }, 'image/jpeg', REDUCE_RATIO);
            };
        });
        reader.readAsDataURL(file);
    }
}
