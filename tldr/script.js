const commands = [
    // File Operations
    {
        category: "File Operations",
        name: "ls",
        desc: "List directory contents",
        examples: ["ls -la          # List all files with details", "ls -lh          # Human-readable sizes"]
    },
    {
        category: "File Operations",
        name: "cd",
        desc: "Change current directory",
        examples: ["cd /path/to/dir   # Change to directory", "cd ..           # Go to parent directory", "cd ~            # Go to home directory"]
    },
    {
        category: "File Operations",
        name: "cp",
        desc: "Copy files or directories",
        examples: ["cp file1 file2      # Copy file1 to file2", "cp -r dir1 dir2     # Copy directory recursively"]
    },
    {
        category: "File Operations",
        name: "mv",
        desc: "Move or rename files and directories",
        examples: ["mv file1 file2      # Rename or move file", "mv dir1 /new/path   # Move directory"]
    },
    {
        category: "File Operations",
        name: "rm",
        desc: "Remove files or directories",
        examples: ["rm file           # Remove a file", "rm -rf dir          # Remove directory recursively"]
    },
    {
        category: "File Operations",
        name: "mkdir",
        desc: "Create a new directory",
        examples: ["mkdir newdir        # Create directory", "mkdir -p a/b/c      # Create nested directories"]
    },
    {
        category: "File Operations",
        name: "touch",
        desc: "Create empty file or update timestamp",
        examples: ["touch file.txt      # Create empty file", "touch -t 202601010000 file  # Set specific timestamp"]
    },
    {
        category: "File Operations",
        name: "cat",
        desc: "Display or concatenate file contents",
        examples: ["cat file.txt        # Display file content", "cat f1 f2 > f3      # Combine files into f3"]
    },
    {
        category: "File Operations",
        name: "less",
        desc: "View file contents page by page",
        examples: ["less file.txt       # View file with pagination", "dmesg | less      # View kernel log"]
    },
    {
        category: "File Operations",
        name: "find",
        desc: "Search for files in directory hierarchy",
        examples: ["find / -name file.txt  # Find file by name", "find . -type f -name '*.log'  # Find log files"]
    },

    // Permissions
    {
        category: "Permissions",
        name: "chmod",
        desc: "Change file permissions",
        examples: ["chmod 755 file      # rwxr-xr-x permissions", "chmod +x script.sh  # Make executable"]
    },
    {
        category: "Permissions",
        name: "chown",
        desc: "Change file owner and group",
        examples: ["chown user file     # Change owner", "chown user:group dir  # Change owner and group"]
    },

    // System Information
    {
        category: "System Information",
        name: "ps",
        desc: "Display information about running processes",
        examples: ["ps aux           # List all processes", "ps -ef            # List in full format"]
    },
    {
        category: "System Information",
        name: "top",
        desc: "Real-time view of running processes and system resources",
        examples: ["top              # Interactive process viewer", "top -u username    # Show user's processes"]
    },
    {
        category: "System Information",
        name: "df",
        desc: "Report file system disk space usage",
        examples: ["df -h            # Human-readable disk usage", "df -i            # Show inode usage"]
    },
    {
        category: "System Information",
        name: "free",
        desc: "Display free and used memory",
        examples: ["free -h          # Human-readable memory info", "free -m          # Show in megabytes"]
    },
    {
        category: "System Information",
        name: "uname",
        desc: "Print system information",
        examples: ["uname -a         # All system info", "uname -r         # Kernel release"]
    },
    {
        category: "System Information",
        name: "whoami",
        desc: "Display current username",
        examples: ["whoami           # Show current user"]
    },

    // Text Processing
    {
        category: "Text Processing",
        name: "grep",
        desc: "Search for patterns in text",
        examples: ["grep 'pattern' file    # Search in file", "grep -r 'pattern' .   # Recursive search", "grep -i 'text' file   # Case-insensitive"]
    },
    {
        category: "Text Processing",
        name: "sed",
        desc: "Stream editor for filtering and transforming text",
        examples: ["sed 's/old/new/' file    # Replace first occurrence", "sed -i 's/a/b/g' file   # In-place global replace"]
    },
    {
        category: "Text Processing",
        name: "awk",
        desc: "Pattern scanning and processing language",
        examples: ["awk '{print $1}' file    # Print first column", "awk -F: '{print $1}' /etc/passwd  # Custom delimiter"]
    },
    {
        category: "Text Processing",
        name: "cut",
        desc: "Remove sections from each line of files",
        examples: ["cut -d: -f1 file    # Extract first field", "cut -c1-5 file      # Extract characters 1-5"]
    },

    // Network
    {
        category: "Network",
        name: "curl",
        desc: "Transfer data from or to a server",
        examples: ["curl URL           # Download and display", "curl -o file URL      # Save to file", "curl -I URL          # Show headers only"]
    },
    {
        category: "Network",
        name: "wget",
        desc: "Non-interactive network downloader",
        examples: ["wget URL           # Download file", "wget -c URL         # Resume interrupted download"]
    },
    {
        category: "Network",
        name: "ping",
        desc: "Test connectivity to a host",
        examples: ["ping google.com    # Test connection", "ping -c 4 host     # Send 4 packets"]
    },
    {
        category: "Network",
        name: "ssh",
        desc: "Secure shell login to remote machine",
        examples: ["ssh user@host      # Connect to remote server", "ssh -p 2222 user@h   # Custom port"]
    },
    {
        category: "Network",
        name: "ip",
        desc: "Show/manage IP addresses and routes",
        examples: ["ip addr show       # Show all IP addresses", "ip route show      # Show routing table"]
    },

    // Archives
    {
        category: "Archives",
        name: "tar",
        desc: "Create or extract archive files",
        examples: ["tar -czf out.tar.gz dir   # Create gzip archive", "tar -xzf file.tar.gz    # Extract archive"]
    },
    {
        category: "Archives",
        name: "zip",
        desc: "Create ZIP archive",
        examples: ["zip -r out.zip dir   # Create zip archive", "unzip out.zip       # Extract zip file"]
    },
    {
        category: "Archives",
        name: "gzip",
        desc: "Compress or decompress files",
        examples: ["gzip file        # Compress file", "gzip -d file.gz    # Decompress"]
    },

    // Package Management
    {
        category: "Package Management",
        name: "apt",
        desc: "Ubuntu/Debian package manager",
        examples: ["apt update         # Update package list", "apt install pkg     # Install package", "apt remove pkg      # Remove package"]
    },
    {
        category: "Package Management",
        name: "yum",
        desc: "CentOS/RHEL package manager",
        examples: ["yum install pkg     # Install package", "yum update         # Update all packages"]
    },

    // Process Management
    {
        category: "Process Management",
        name: "kill",
        desc: "Terminate a process by PID or name",
        examples: ["kill PID           # Terminate process", "kill -9 PID        # Force kill", "pkill procss_name  # Kill by name"]
    },
    {
        category: "Process Management",
        name: "nohup",
        desc: "Run a command immune to hangups",
        examples: ["nohup command &    # Run in background persistently"]
    }
];

function renderCommands(commandsToRender) {
    const container = document.getElementById('commandsContainer');
    const categories = {};

    commandsToRender.forEach(cmd => {
        if (!categories[cmd.category]) {
            categories[cmd.category] = [];
        }
        categories[cmd.category].push(cmd);
    });

    let html = '';
    for (const [category, cmds] of Object.entries(categories)) {
        html += `<div class="category" data-category="${category}">`;
        html += `<h2 class="category-title">${category}</h2>`;
        
        cmds.forEach(cmd => {
            html += `<div class="command-card" data-name="${cmd.name.toLowerCase()}" data-desc="${cmd.desc.toLowerCase()}">`;
            html += `<div class="command-name">${cmd.name}</div>`;
            html += `<div class="command-desc">${cmd.desc}</div>`;
            
            cmd.examples.forEach(ex => {
                const code = ex.split('#')[0].trim();
                html += `<div class="command-example">`;
                html += `<span class="example-code">${ex}</span>`;
                html += `<button class="copy-btn" onclick="copyToClipboard('${code.replace(/'/g, "\\'")}', this)">Copy</button>`;
                html += `</div>`;
            });
            
            html += `</div>`;
        });
        
        html += `</div>`;
    }

    container.innerHTML = html;
    updateStats(commandsToRender.length);
}

function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
        }, 1500);
    });
}

function updateStats(count) {
    const stats = document.getElementById('stats');
    stats.textContent = `Showing ${count} of ${commands.length} commands`;
}

document.getElementById('searchBox').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (!query) {
        renderCommands(commands);
        return;
    }

    const filtered = commands.filter(cmd => 
        cmd.name.toLowerCase().includes(query) || 
        cmd.desc.toLowerCase().includes(query) ||
        cmd.category.toLowerCase().includes(query) ||
        cmd.examples.some(ex => ex.toLowerCase().includes(query))
    );

    renderCommands(filtered);
});

// Initial render
renderCommands(commands);