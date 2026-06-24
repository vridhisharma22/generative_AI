const chatWindow = document.getElementById('chatWindow');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Updated with all 3 of Vridhi's original projects
const vridhiData = {
    skills: "Vridhi Sharma's core development stacks:\n• **Languages**: C, Java, Python, JavaScript, HTML, CSS, SQL\n• **Core Paradigms**: Data Structures & Algorithms, Object-Oriented Programming (OOP)\n• **Tools**: Node.js, Rest APIs, Git, Responsive Interface Systems.",
    education: "Vridhi Sharma's academic timeline:\n• **NMIMS**: B.Tech in Computer Engineering student.\n• **Pinegrove School**: Spent 7 years in boarding school. Active member of the Student Council and Student Coordinator of the Ecology Club.",
    projects: "Vridhi has built 3 key functional applications:\n\n1. **NextGen Hack**: A dynamic hackathon platform featuring a battle-themed UI/UX, registration systems, and scheduling views.\n\n2. **Skill Swap**: A full-stack learning marketplace that coordinates student matching parameters based on specific skills using custom matching algorithms.\n\n3. **Why Worry?**: A responsive digital application that translates structural mental grounding exercises into interactive forms via the Web Storage API to manage user anxiety."
};

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const queryText = userInput.value.trim();
    if(!queryText) return;
    
    userInput.value = '';
    await processGlobalQuery(queryText);
});

function triggerQuery(pillText) {
    processGlobalQuery(pillText);
}

async function processGlobalQuery(text) {
    appendRow(text, 'outgoing');
    const loadingRow = appendLoadingIndicator();
    const norm = text.toLowerCase();

    // Context mapping checks
    if (norm.includes('vridhi') || norm.includes('your skills') || norm.includes('portfolio') || norm.includes('project') || norm.includes('you study') || norm.includes('college') || norm.includes('built')) {
        setTimeout(() => {
            loadingRow.remove();
            if (norm.includes('skill') || norm.includes('language') || norm.includes('code')) {
                appendRow(vridhiData.skills, 'incoming');
            } else if (norm.includes('project') || norm.includes('build') || norm.includes('built') || norm.includes('worry') || norm.includes('hack') || norm.includes('swap')) {
                appendRow(vridhiData.projects, 'incoming');
            } else {
                appendRow(vridhiData.education, 'incoming');
            }
        }, 400);
        return;
    }

    // Serverless Gateway Call
    try {
        sendBtn.disabled = true;
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "model": "google/gemma-2-9b-it:free",
                "messages": [
                    {"role": "system", "content": "You are a helpful AI assistant. Answer clearly, concisely, and completely in English."},
                    {"role": "user", "content": text}
                ]
            })
        });

        if (!response.ok) throw new Error("Gateway Overload");

        const data = await response.json();
        loadingRow.remove();

        let aiReply = "";
        if (data && data.choices && data.choices[0] && data.choices[0].message) {
            aiReply = data.choices[0].message.content.trim();
        } else {
            aiReply = "Request completed, but routing was slow. Please query again!";
        }

        appendRow(aiReply, 'incoming');
    } catch (error) {
        console.error(error);
        loadingRow.remove();
        appendRow("The open AI gateway is busy. For immediate information regarding Vridhi, click the 'Technical Skills' or 'Project Showcase' shortcuts above!", 'incoming');
    } finally {
        sendBtn.disabled = false;
    }
}

function appendRow(msg, sender) {
    const row = document.createElement('div');
    row.className = `msg-row ${sender}`;
    const b = document.createElement('div');
    b.className = 'bubble';
    b.innerHTML = msg.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    row.appendChild(b);
    chatWindow.appendChild(row);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function appendLoadingIndicator() {
    const row = document.createElement('div');
    row.className = 'msg-row incoming';
    const b = document.createElement('div');
    b.className = 'bubble';
    b.innerHTML = `<div class="typing-loader"><span></span><span></span><span></span></div>`;
    row.appendChild(b);
    chatWindow.appendChild(row);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return row;
}