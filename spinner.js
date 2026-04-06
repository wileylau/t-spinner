document.addEventListener('DOMContentLoaded', () => {
    const labels = [
        "好唔鍾意你",
        "你好煩",
        "最唔鍾意就係同你一齊",
        "話你都嫌費事",
        "要求又多又麻煩",
        "啲性格又奇怪",
        "總之就係好唔鍾意你",
        "我忍夠啦"
    ];

    const canvas = document.getElementById('spinnerCanvas');
    const ctx = canvas.getContext('2d');
    const spinBtn = document.getElementById('spinBtn');
    const resultDisplay = document.getElementById('resultDisplay');

    let currentRotation = 0;
    let isSpinning = false;

    const options = labels.map((label, i) => {
        let color;
        if (i % 3 === 0) {
            color = "#ff2d55";
        } else if (i % 2 === 0) {
            color = "#141416";
        } else {
            color = "#1e1e21";
        }
        return { label, color };
    });

    function drawSpinner() {
        if (!canvas) return;
        const size = canvas.width;
        const center = size / 2;
        const arcSize = (2 * Math.PI) / options.length;

        ctx.clearRect(0, 0, size, size);

        options.forEach((opt, i) => {
            const angle = i * arcSize;
            
            // Draw Slice
            ctx.beginPath();
            ctx.fillStyle = opt.color;
            ctx.moveTo(center, center);
            ctx.arc(center, center, center, angle, angle + arcSize);
            ctx.fill();

            // Draw Text (Minimalist System Font)
            ctx.save();
            ctx.translate(center, center);
            ctx.rotate(angle + arcSize / 2);
            ctx.textAlign = "right";
            
            // Contrast logic: white text on dark, or specific gray on pink
            ctx.fillStyle = opt.color === "#ff2d55" ? "#ffffff" : "rgba(255, 255, 255, 0.6)";
            
            // Thin, lowercase, clean spacing
            ctx.font = "300 13px system-ui, -apple-system, sans-serif";
            ctx.fillText(opt.label.toLowerCase(), center - 40, 5);
            ctx.restore();
        });
    }

    // 4. SPIN ANIMATION
    function spin() {
        if (isSpinning) return;

        isSpinning = true;
        
        resultDisplay.style.opacity = "0";
        resultDisplay.style.transform = "translateY(10px)";
        
        const extraDegrees = Math.floor(4000 + Math.random() * 5000);
        currentRotation += extraDegrees;
        
        canvas.style.transform = `rotate(${currentRotation}deg)`;

        setTimeout(() => {
            isSpinning = false;
            
            const actualDegrees = currentRotation % 360;
            const segmentDegrees = 360 / options.length;
            
            const winningIndex = Math.floor((360 - (actualDegrees % 360) + 270) % 360 / segmentDegrees);
            
            resultDisplay.innerText = options[winningIndex].label.toLowerCase();
            resultDisplay.style.opacity = "1";
            resultDisplay.style.transform = "translateY(0)";
            
            if (options[winningIndex].color === "#ff2d55") {
                resultDisplay.style.color = "#ff2d55";
                resultDisplay.style.textShadow = "0 0 15px rgba(255, 45, 85, 0.5)";
            } else {
                resultDisplay.style.color = "white";
                resultDisplay.style.textShadow = "none";
            }
        }, 5000); 
    }

    drawSpinner();
    spinBtn.addEventListener('click', spin);

    /**
     * USER CUSTOMIZATION (DORMANT)
     * To allow users to add options later, use:
     * * function addNewOption(text) {
     * labels.push(text);
     * // Re-run the map and draw
     * // ...
     * }
     */
});