/* ==========================================================================
   PRODUCTION DEVOPS WORKSTATION SCRIPT
   - Multi-View SPA System
   - Node IP Clipboard Engine
   - Interactive Bash Terminal with Command History & Autocomplete
   - Live DevSecOps Jenkins/Argo CD Pipeline Simulator
   - Quick Command Palette (Cmd + K / Ctrl + K)
   ========================================================================== */

// 1. Reactive View Management
const navTabs = document.querySelectorAll(".nav-tab");
const viewPanels = document.querySelectorAll(".view-panel");

function switchView(target) {
    navTabs.forEach(tab => {
        tab.classList.toggle("active", tab.dataset.viewTarget === target);
    });

    viewPanels.forEach(panel => {
        panel.classList.toggle("active", panel.id === `view-${target}`);
    });

    document.body.setAttribute("data-view", target);

    const consoleNav = document.querySelector(".console-nav");
    if (consoleNav) {
        consoleNav.classList.remove("mobile-active");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

navTabs.forEach(tab => {
    tab.addEventListener("click", () => switchView(tab.dataset.viewTarget));
});

// Mobile menu toggle
const mobileToggle = document.getElementById("mobileToggle");
const consoleNav = document.querySelector(".console-nav");

if (mobileToggle && consoleNav) {
    mobileToggle.addEventListener("click", () => {
        consoleNav.classList.toggle("mobile-active");
    });
}

// 2. Node IP Copy Engine
function copyNodeIp() {
    const ipText = "10.0.1.24";
    navigator.clipboard.writeText(ipText).then(() => {
        const btn = document.getElementById("btnCopyIp");
        if (btn) {
            const original = btn.textContent;
            btn.textContent = "Copied!";
            btn.style.color = "var(--brand-emerald)";
            btn.style.borderColor = "var(--brand-emerald)";
            setTimeout(() => {
                btn.textContent = original;
                btn.style.color = "";
                btn.style.borderColor = "";
            }, 2000);
        }
    });
}

// 3. Project Category Filtering
const filterPills = document.querySelectorAll(".filter-pill");
const projectCards = document.querySelectorAll(".project-card");

filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
        filterPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");

        const filter = pill.dataset.filter;
        projectCards.forEach(card => {
            if (filter === "all" || card.dataset.category === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// 4. Manifest Code Drawer Toggle
function toggleManifest(id) {
    const el = document.getElementById(id);
    if (el) {
        el.classList.toggle("open");
    }
}

// 5. Interactive Bash Shell (CLI Emulator)
const termScreen = document.getElementById("termScreen");
const termHistory = document.getElementById("termHistory");
const termInput = document.getElementById("termInput");

const cliDatabase = {
    "help": "Available commands:\n  • kubectl get pods       - List running k8s pods\n  • kubectl get nodes      - List AWS EKS worker nodes\n  • terraform state list   - Inspect provisioned infrastructure\n  • trivy scan             - Execute container vulnerability audit\n  • cat resume             - View career summary & contacts\n  • clear                  - Clear terminal output\n  • whoami                 - View authenticated IAM user",
    "kubectl get pods": "NAME                               READY   STATUS    RESTARTS   AGE\nretail-frontend-7f89d7b4c-28m9l    1/1     Running   0          4d2h\nretail-catalog-5d68bc874-vkl4m     1/1     Running   0          4d2h\nretail-cart-9f84b574f-9m8wq        1/1     Running   0          4d2h\ntetris-devsecops-845b98cf9-x7zq4   1/1     Running   0          12d",
    "kubectl get nodes": "NAME                             STATUS   ROLES    AGE   VERSION\nip-10-0-1-24.ec2.internal        Ready    node     34d   v1.30.2-eks\nip-10-0-2-88.ec2.internal        Ready    node     34d   v1.30.2-eks",
    "terraform state list": "aws_vpc.main\naws_subnet.public[0]\naws_subnet.private[0]\naws_eks_cluster.production\naws_eks_node_group.workers\naws_db_instance.rds_postgres\naws_lb.alb_ingress",
    "trivy scan": "2026-09-03T11:00:24Z INFO Scanning container image: ecr.aws/retail:latest\nTotal: 0 vulnerabilities (CRITICAL: 0, HIGH: 0, MEDIUM: 0)\nArtifact clean. Image approved for production rollout.",
    "cat resume": "MAYANK SHASHANK GUPTA\nEmail: guptamayankshashank@gmail.com | Phone: +91 79034 11876\nEducation: B.E. Civil Eng (BMS College of Engineering, CGPA: 7.43)\nSpecialty: AWS, Kubernetes, Terraform, Jenkins, Argo CD, DevSecOps.",
    "whoami": "arn:aws:iam::8942119024:user/Mayank-Shashank (AdministratorAccess)"
};

let cmdHistoryStack = [];
let historyPointer = -1;

function runCliCommand(rawCmd) {
    if (!termHistory || !termInput) return;
    const cleanCmd = rawCmd.trim();
    if (!cleanCmd) return;

    cmdHistoryStack.push(cleanCmd);
    historyPointer = cmdHistoryStack.length;

    const row = document.createElement("div");
    row.style.marginBottom = "8px";
    row.innerHTML = `<span style="color:#10b981; font-weight:bold;">mayank:~$</span> <span style="color:#fff;">${cleanCmd}</span>`;
    termHistory.appendChild(row);

    if (cleanCmd.toLowerCase() === "clear") {
        termHistory.innerHTML = "";
    } else {
        const response = document.createElement("pre");
        response.style.fontFamily = "var(--font-mono)";
        response.style.fontSize = "11.5px";
        response.style.color = "#94a3b8";
        response.style.lineHeight = "1.5";
        response.style.marginBottom = "10px";
        response.style.whiteSpace = "pre-wrap";

        if (cliDatabase[cleanCmd]) {
            response.textContent = cliDatabase[cleanCmd];
        } else {
            response.textContent = `bash: command not found: ${cleanCmd}. Type 'help' to see valid commands.`;
        }
        termHistory.appendChild(response);
    }

    termInput.value = "";
    termScreen.scrollTop = termScreen.scrollHeight;
}

if (termInput) {
    termInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            runCliCommand(termInput.value);
        } else if (e.key === "ArrowUp") {
            if (historyPointer > 0) {
                historyPointer--;
                termInput.value = cmdHistoryStack[historyPointer];
            }
        } else if (e.key === "ArrowDown") {
            if (historyPointer < cmdHistoryStack.length - 1) {
                historyPointer++;
                termInput.value = cmdHistoryStack[historyPointer];
            } else {
                historyPointer = cmdHistoryStack.length;
                termInput.value = "";
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            const keys = Object.keys(cliDatabase);
            const match = keys.find(k => k.startsWith(termInput.value.trim()));
            if (match) termInput.value = match;
        }
    });
}

// 6. DevSecOps Jenkins + Argo CD Pipeline Simulator
const btnRunPipeline = document.getElementById("btnRunPipeline");
const pipelineConsole = document.getElementById("pipelineConsole");

const pipelineSteps = [
    { id: "stage-lint", title: "SonarQube SAST", log: "[INFO] Running SonarScanner analysis... 0 bugs, 0 vulnerabilities. Quality Gate: PASSED." },
    { id: "stage-sast", title: "OWASP Dependency Check", log: "[INFO] OWASP Dependency-Check running... 0 High/Critical CVEs identified in manifests." },
    { id: "stage-docker", title: "Trivy Container Scan", log: "[INFO] Trivy scanning ECR image... Image vulnerability score: CLEAN (0 vulnerabilities)." },
    { id: "stage-argo", title: "Argo CD GitOps Sync", log: "[INFO] Argo CD synchronizing cluster state with Git HEAD... Application Healthy & Synced." }
];

let pipelineActive = false;

if (btnRunPipeline) {
    btnRunPipeline.addEventListener("click", () => {
        if (pipelineActive) return;
        pipelineActive = true;
        btnRunPipeline.disabled = true;
        btnRunPipeline.textContent = "Pipeline Running...";

        pipelineConsole.innerHTML = `[build-agent] Initializing pipeline execution on AWS runner...\n`;

        pipelineSteps.forEach(s => {
            const node = document.getElementById(s.id);
            if (node) {
                node.className = "p-stage";
                node.querySelector(".p-status").textContent = "QUEUED";
            }
        });

        let idx = 0;
        function advanceStage() {
            if (idx < pipelineSteps.length) {
                const current = pipelineSteps[idx];
                const stageEl = document.getElementById(current.id);

                if (stageEl) {
                    stageEl.className = "p-stage active";
                    stageEl.querySelector(".p-status").textContent = "RUNNING";
                }

                pipelineConsole.innerHTML += `[${new Date().toLocaleTimeString()}] ${current.log}\n`;
                pipelineConsole.scrollTop = pipelineConsole.scrollHeight;

                setTimeout(() => {
                    if (stageEl) {
                        stageEl.className = "p-stage success";
                        stageEl.querySelector(".p-status").textContent = "SUCCESS";
                    }
                    idx++;
                    advanceStage();
                }, 850);
            } else {
                pipelineConsole.innerHTML += `[${new Date().toLocaleTimeString()}] ✔ Pipeline build completed. Workloads running on AWS EKS.\n`;
                btnRunPipeline.disabled = false;
                btnRunPipeline.textContent = "Dispatch Pipeline";
                pipelineActive = false;
            }
        }

        advanceStage();
    });
}

// 7. Global Command Palette (Cmd + K)
const cmdOverlay = document.getElementById("cmdOverlay");
const cmdTriggerBtn = document.getElementById("cmdTriggerBtn");
const cmdInput = document.getElementById("cmdInput");
const cmdResults = document.getElementById("cmdResults");

const quickActions = [
    { name: "View Overview & Dashboard", action: () => switchView("dashboard"), tag: "View" },
    { name: "Inspect 3 Production Projects", action: () => switchView("deployments"), tag: "Projects" },
    { name: "Open Interactive CLI Shell & Pipeline", action: () => switchView("workstation"), tag: "Interactive" },
    { name: "Open Credentials & Certifications", action: () => switchView("credentials"), tag: "Vault" },
    { name: "Download Resume.pdf", action: () => window.open("assets/resume.pdf", "_blank"), tag: "File" },
    { name: "Visit GitHub Repositories", action: () => window.open("https://github.com/imayanks", "_blank"), tag: "Link" },
    { name: "Visit LinkedIn Profile", action: () => window.open("https://www.linkedin.com/in/imayank0705", "_blank"), tag: "Link" },
    { name: "Copy Bastion Node IP", action: () => copyNodeIp(), tag: "Action" }
];

function renderCmdResults(query = "") {
    if (!cmdResults) return;
    cmdResults.innerHTML = "";

    const filtered = quickActions.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));

    if (filtered.length === 0) {
        cmdResults.innerHTML = `<div style="padding: 12px; font-size:13px; color:#64748b;">No matching commands found.</div>`;
        return;
    }

    filtered.forEach((item, i) => {
        const el = document.createElement("div");
        el.className = `cmd-item ${i === 0 ? 'selected' : ''}`;
        el.innerHTML = `
            <span>${item.name}</span>
            <span class="cmd-item-shortcut">${item.tag}</span>
        `;
        el.addEventListener("click", () => {
            item.action();
            closeCmdPalette();
        });
        cmdResults.appendChild(el);
    });
}

function openCmdPalette() {
    if (cmdOverlay) {
        cmdOverlay.classList.add("active");
        renderCmdResults("");
        if (cmdInput) {
            cmdInput.value = "";
            cmdInput.focus();
        }
    }
}

function closeCmdPalette() {
    if (cmdOverlay) {
        cmdOverlay.classList.remove("active");
    }
}

if (cmdTriggerBtn) {
    cmdTriggerBtn.addEventListener("click", openCmdPalette);
}

window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (cmdOverlay && cmdOverlay.classList.contains("active")) {
            closeCmdPalette();
        } else {
            openCmdPalette();
        }
    } else if (e.key === "Escape") {
        closeCmdPalette();
    }
});

if (cmdInput) {
    cmdInput.addEventListener("input", (e) => {
        renderCmdResults(e.target.value);
    });
}

if (cmdOverlay) {
    cmdOverlay.addEventListener("click", (e) => {
        if (e.target === cmdOverlay) closeCmdPalette();
    });
}

// 8. Dynamic Year & Global Telemetry
const dynYear = document.getElementById("dynYear");
if (dynYear) {
    dynYear.textContent = new Date().getFullYear();
}

window.addEventListener("scroll", () => {
    const readingProgress = document.getElementById("readingProgress");
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (readingProgress && docHeight > 0) {
        readingProgress.style.width = `${(window.scrollY / docHeight) * 100}%`;
    }

    const topNav = document.getElementById("topNav");
    if (topNav) {
        topNav.classList.toggle("scrolled", window.scrollY > 20);
    }
}, { passive: true });

// Live Simulated Telemetry Jitter
setInterval(() => {
    const reqEl = document.getElementById("telemetryReq");
    const latEl = document.getElementById("telemetryLat");
    if (reqEl) reqEl.textContent = (1450 + Math.floor(Math.random() * 60)).toLocaleString();
    if (latEl) latEl.textContent = 13 + Math.floor(Math.random() * 3);
}, 3000);