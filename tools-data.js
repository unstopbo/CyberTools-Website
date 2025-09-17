// Comprehensive Cyber Tools Database
const cyberTools = [
    // Network Scanning Tools
    {
        id: 1,
        name: "Nmap",
        category: "network-scanning",
        description: "Network Mapper - A powerful network discovery and security auditing tool used to discover hosts and services on a network.",
        rating: 4.9,
        reviews: 1250,
        installation: {
            windows: "Download from https://nmap.org/download.html and run the installer",
            linux: "sudo apt-get install nmap (Ubuntu/Debian) or sudo yum install nmap (CentOS/RHEL)",
            mac: "brew install nmap"
        },
        usage: [
            "nmap -sS target_ip  # TCP SYN scan",
            "nmap -sU target_ip  # UDP scan",
            "nmap -A target_ip   # Aggressive scan with OS detection",
            "nmap -p 1-1000 target_ip  # Scan specific port range"
        ],
        useCases: [
            "Network inventory and asset discovery",
            "Security auditing and vulnerability assessment",
            "Network troubleshooting and monitoring",
            "Penetration testing reconnaissance"
        ],
        pros: [
            "Extremely versatile with many scan types",
            "Excellent documentation and community support",
            "Cross-platform compatibility",
            "Powerful scripting engine (NSE)",
            "Industry standard tool"
        ],
        cons: [
            "Can be detected by intrusion detection systems",
            "Learning curve for advanced features",
            "Aggressive scans may impact network performance",
            "Requires root privileges for some scan types"
        ],
        website: "https://nmap.org",
        documentation: "https://nmap.org/docs.html"
    },
    {
        id: 2,
        name: "Masscan",
        category: "network-scanning",
        description: "High-speed port scanner capable of scanning the entire Internet in under 6 minutes.",
        rating: 4.6,
        reviews: 420,
        installation: {
            windows: "Download from GitHub releases or compile from source",
            linux: "sudo apt-get install masscan or compile from source",
            mac: "brew install masscan"
        },
        usage: [
            "masscan -p1-65535 10.0.0.0/8 --rate=1000",
            "masscan -p80,8000-8100 10.0.0.0/8",
            "masscan --top-ports 100 192.168.1.0/24"
        ],
        useCases: [
            "Large-scale network reconnaissance",
            "Internet-wide scanning projects",
            "Quick port discovery on large networks",
            "Security research and threat hunting"
        ],
        pros: [
            "Extremely fast scanning speed",
            "Can handle massive IP ranges",
            "Asynchronous scanning architecture",
            "Low resource consumption"
        ],
        cons: [
            "Less feature-rich than Nmap",
            "TCP SYN scans only",
            "Requires careful rate limiting",
            "May trigger network security alerts"
        ],
        website: "https://github.com/robertdavidgraham/masscan",
        documentation: "https://github.com/robertdavidgraham/masscan/blob/master/doc/masscan.8.markdown"
    },

    // Vulnerability Scanning Tools
    {
        id: 3,
        name: "Nessus",
        category: "vulnerability-scanning",
        description: "Comprehensive vulnerability scanner that identifies security holes, malware, and compliance issues.",
        rating: 4.7,
        reviews: 890,
        installation: {
            windows: "Download from Tenable website and run installer",
            linux: "Download .deb or .rpm package from Tenable",
            mac: "Download .dmg from Tenable website"
        },
        usage: [
            "Access via web interface at https://localhost:8834",
            "Create scan policies and templates",
            "Schedule automated scans",
            "Generate compliance and vulnerability reports"
        ],
        useCases: [
            "Enterprise vulnerability management",
            "Compliance auditing (PCI DSS, HIPAA)",
            "Web application security testing",
            "Configuration auditing"
        ],
        pros: [
            "Comprehensive vulnerability database",
            "Professional reporting features",
            "Regular plugin updates",
            "Enterprise-grade support",
            "Compliance templates included"
        ],
        cons: [
            "Commercial license required",
            "Resource intensive",
            "Can be expensive for large deployments",
            "Learning curve for advanced features"
        ],
        website: "https://www.tenable.com/products/nessus",
        documentation: "https://docs.tenable.com/nessus/"
    },
    {
        id: 4,
        name: "OpenVAS",
        category: "vulnerability-scanning",
        description: "Open-source vulnerability assessment tool and scanner with comprehensive vulnerability tests.",
        rating: 4.3,
        reviews: 650,
        installation: {
            windows: "Use Docker or virtual machine",
            linux: "sudo apt-get install openvas or use Docker",
            mac: "Use Docker or virtual machine"
        },
        usage: [
            "sudo gvm-setup  # Initial setup",
            "sudo gvm-start  # Start services",
            "Access web interface at https://localhost:9392",
            "Create targets and scan configurations"
        ],
        useCases: [
            "Free alternative to commercial scanners",
            "Network vulnerability assessment",
            "Compliance scanning",
            "Security research and education"
        ],
        pros: [
            "Completely free and open source",
            "Regular vulnerability feed updates",
            "Comprehensive scanning capabilities",
            "Good community support",
            "No licensing restrictions"
        ],
        cons: [
            "Complex installation and setup",
            "Resource intensive",
            "Slower than commercial alternatives",
            "Limited professional support",
            "User interface can be confusing"
        ],
        website: "https://www.openvas.org",
        documentation: "https://docs.greenbone.net/"
    },

    // Penetration Testing Tools
    {
        id: 5,
        name: "Metasploit",
        category: "penetration-testing",
        description: "World's most used penetration testing framework with extensive exploit database and payload generation.",
        rating: 4.8,
        reviews: 2100,
        installation: {
            windows: "Download installer from Rapid7 website",
            linux: "curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall && chmod 755 msfinstall && ./msfinstall",
            mac: "brew install metasploit"
        },
        usage: [
            "msfconsole  # Start Metasploit console",
            "search exploit_name  # Search for exploits",
            "use exploit/windows/smb/ms17_010_eternalblue",
            "set RHOSTS target_ip && exploit"
        ],
        useCases: [
            "Penetration testing and ethical hacking",
            "Exploit development and testing",
            "Security training and education",
            "Red team operations"
        ],
        pros: [
            "Largest exploit database available",
            "Modular framework architecture",
            "Active community and development",
            "Integrated payload generation",
            "Excellent for learning exploitation"
        ],
        cons: [
            "Can be detected by modern antivirus",
            "Requires significant security knowledge",
            "Legal and ethical considerations",
            "Pro version is expensive"
        ],
        website: "https://www.metasploit.com",
        documentation: "https://docs.rapid7.com/metasploit/"
    },
    {
        id: 6,
        name: "Burp Suite",
        category: "penetration-testing",
        description: "Integrated platform for web application security testing with proxy, scanner, and various tools.",
        rating: 4.7,
        reviews: 1800,
        installation: {
            windows: "Download JAR file or installer from PortSwigger",
            linux: "Download JAR file and run with Java",
            mac: "Download JAR file or use Homebrew"
        },
        usage: [
            "Configure browser proxy to 127.0.0.1:8080",
            "Use Proxy tab to intercept requests",
            "Send requests to Repeater for manual testing",
            "Use Scanner for automated vulnerability detection"
        ],
        useCases: [
            "Web application penetration testing",
            "API security testing",
            "Manual security testing",
            "Bug bounty hunting"
        ],
        pros: [
            "Industry standard for web app testing",
            "Excellent proxy and intercepting capabilities",
            "Powerful scanner in Pro version",
            "Extensive plugin ecosystem",
            "Great for manual testing workflows"
        ],
        cons: [
            "Pro version is expensive",
            "Free version has limited features",
            "Can be slow with large applications",
            "Steep learning curve for beginners",
            "Java-based performance limitations"
        ],
        website: "https://portswigger.net/burp",
        documentation: "https://portswigger.net/burp/documentation"
    },

    // Digital Forensics Tools
    {
        id: 7,
        name: "Autopsy",
        category: "forensics",
        description: "Digital forensics platform with graphical interface for analyzing hard drives and mobile devices.",
        rating: 4.5,
        reviews: 720,
        installation: {
            windows: "Download installer from Sleuth Kit website",
            linux: "Available in most repositories or compile from source",
            mac: "Download from Sleuth Kit website"
        },
        usage: [
            "Create new case and add data sources",
            "Run ingest modules for automated analysis",
            "Browse file system and recover deleted files",
            "Generate forensic reports"
        ],
        useCases: [
            "Digital forensic investigations",
            "Incident response",
            "Data recovery",
            "Law enforcement investigations"
        ],
        pros: [
            "Free and open source",
            "User-friendly graphical interface",
            "Comprehensive analysis modules",
            "Good documentation and tutorials",
            "Supports many file systems"
        ],
        cons: [
            "Can be slow with large disk images",
            "Limited mobile device support",
            "Requires significant disk space",
            "Some advanced features missing",
            "Memory usage can be high"
        ],
        website: "https://www.autopsy.com",
        documentation: "https://sleuthkit.org/autopsy/docs/"
    },
    {
        id: 8,
        name: "Volatility",
        category: "forensics",
        description: "Advanced memory forensics framework for incident response and malware analysis.",
        rating: 4.6,
        reviews: 580,
        installation: {
            windows: "pip install volatility3 or download standalone executable",
            linux: "pip install volatility3 or use package manager",
            mac: "pip install volatility3"
        },
        usage: [
            "vol.py -f memory.dmp windows.info  # Get system info",
            "vol.py -f memory.dmp windows.pslist  # List processes",
            "vol.py -f memory.dmp windows.netscan  # Network connections",
            "vol.py -f memory.dmp windows.malfind  # Find malware"
        ],
        useCases: [
            "Memory forensics and analysis",
            "Malware analysis",
            "Incident response",
            "Digital forensic investigations"
        ],
        pros: [
            "Leading memory forensics framework",
            "Extensive plugin ecosystem",
            "Supports multiple OS platforms",
            "Active development community",
            "Powerful analysis capabilities"
        ],
        cons: [
            "Command-line interface only",
            "Steep learning curve",
            "Can be slow with large memory dumps",
            "Requires deep technical knowledge",
            "Limited GUI options"
        ],
        website: "https://www.volatilityfoundation.org",
        documentation: "https://volatility3.readthedocs.io/"
    },

    // OSINT Tools
    {
        id: 9,
        name: "Maltego",
        category: "osint",
        description: "Comprehensive OSINT and graphical link analysis tool for gathering and connecting information.",
        rating: 4.4,
        reviews: 950,
        installation: {
            windows: "Download installer from Maltego website",
            linux: "Download AppImage or use package manager",
            mac: "Download from Maltego website"
        },
        usage: [
            "Create new graph and add entities",
            "Run transforms to gather information",
            "Analyze relationships and connections",
            "Export results and generate reports"
        ],
        useCases: [
            "Open source intelligence gathering",
            "Social engineering reconnaissance",
            "Fraud investigation",
            "Threat intelligence analysis"
        ],
        pros: [
            "Excellent data visualization",
            "Large transform library",
            "Professional reporting features",
            "Good for relationship mapping",
            "Intuitive graphical interface"
        ],
        cons: [
            "Expensive commercial license",
            "Limited free version",
            "Can be overwhelming for beginners",
            "Requires internet connectivity",
            "Some transforms cost extra"
        ],
        website: "https://www.maltego.com",
        documentation: "https://docs.maltego.com/"
    },
    {
        id: 10,
        name: "Shodan",
        category: "osint",
        description: "Search engine for Internet-connected devices and services worldwide.",
        rating: 4.8,
        reviews: 1400,
        installation: {
            windows: "pip install shodan or use web interface",
            linux: "pip install shodan or use web interface",
            mac: "pip install shodan or use web interface"
        },
        usage: [
            "shodan search apache  # Search for Apache servers",
            "shodan host 8.8.8.8  # Get info about specific IP",
            "shodan count country:US  # Count devices by country",
            "Use web interface at https://www.shodan.io"
        ],
        useCases: [
            "Internet-wide device reconnaissance",
            "Security research",
            "Asset discovery",
            "Threat intelligence gathering"
        ],
        pros: [
            "Massive database of internet devices",
            "Powerful search filters and queries",
            "API access for automation",
            "Regular data updates",
            "Useful for security research"
        ],
        cons: [
            "Requires paid subscription for full features",
            "Can be used maliciously",
            "Limited free tier",
            "Ethical and legal considerations",
            "Data may not always be current"
        ],
        website: "https://www.shodan.io",
        documentation: "https://help.shodan.io/"
    },

    // Reverse Engineering Tools
    {
        id: 11,
        name: "Ghidra",
        category: "reverse-engineering",
        description: "NSA's open-source software reverse engineering framework with advanced analysis capabilities.",
        rating: 4.7,
        reviews: 1100,
        installation: {
            windows: "Download from NSA GitHub, requires Java JDK 11+",
            linux: "Download from NSA GitHub, requires Java JDK 11+",
            mac: "Download from NSA GitHub, requires Java JDK 11+"
        },
        usage: [
            "Create new project and import binary",
            "Run auto-analysis for initial disassembly",
            "Use decompiler to generate C-like code",
            "Analyze functions and data structures"
        ],
        useCases: [
            "Malware analysis and reverse engineering",
            "Vulnerability research",
            "Software analysis",
            "Binary exploitation development"
        ],
        pros: [
            "Completely free and open source",
            "Powerful decompiler included",
            "Supports many architectures",
            "Active development by NSA",
            "Extensible with plugins"
        ],
        cons: [
            "Steep learning curve",
            "Requires Java runtime",
            "UI can be overwhelming",
            "Less mature than commercial tools",
            "Limited community compared to IDA"
        ],
        website: "https://ghidra-sre.org",
        documentation: "https://ghidra.re/courses/"
    },
    {
        id: 12,
        name: "IDA Pro",
        category: "reverse-engineering",
        description: "Industry-standard disassembler and debugger for reverse engineering binary programs.",
        rating: 4.9,
        reviews: 850,
        installation: {
            windows: "Purchase and download from Hex-Rays website",
            linux: "Purchase and download from Hex-Rays website",
            mac: "Purchase and download from Hex-Rays website"
        },
        usage: [
            "Load binary file for analysis",
            "Use interactive disassembler",
            "Apply signatures and FLIRT patterns",
            "Use debugger for dynamic analysis"
        ],
        useCases: [
            "Professional malware analysis",
            "Vulnerability research",
            "Software cracking and protection analysis",
            "Firmware reverse engineering"
        ],
        pros: [
            "Industry standard for reverse engineering",
            "Excellent decompiler (Hex-Rays)",
            "Extensive plugin ecosystem",
            "Superior analysis capabilities",
            "Professional support available"
        ],
        cons: [
            "Very expensive licensing",
            "Complex interface for beginners",
            "Requires significant training",
            "Resource intensive",
            "Limited free version"
        ],
        website: "https://hex-rays.com/ida-pro/",
        documentation: "https://hex-rays.com/products/ida/support/"
    },

    // Web Security Tools
    {
        id: 13,
        name: "OWASP ZAP",
        category: "web-security",
        description: "Open-source web application security scanner and proxy tool for finding vulnerabilities.",
        rating: 4.5,
        reviews: 1300,
        installation: {
            windows: "Download installer from OWASP website",
            linux: "sudo apt-get install zaproxy or download from website",
            mac: "brew install --cask owasp-zap"
        },
        usage: [
            "Configure browser proxy to use ZAP",
            "Spider the target application",
            "Run active and passive scans",
            "Generate security reports"
        ],
        useCases: [
            "Web application security testing",
            "API security assessment",
            "DevSecOps integration",
            "Security training and education"
        ],
        pros: [
            "Completely free and open source",
            "Easy to use for beginners",
            "Good automation capabilities",
            "Active community support",
            "Regular updates and improvements"
        ],
        cons: [
            "Less advanced than commercial tools",
            "Can produce false positives",
            "Limited advanced features",
            "UI could be more intuitive",
            "Slower scanning compared to paid tools"
        ],
        website: "https://www.zaproxy.org",
        documentation: "https://www.zaproxy.org/docs/"
    },
    {
        id: 14,
        name: "Nikto",
        category: "web-security",
        description: "Web server scanner that tests for dangerous files, outdated software, and security issues.",
        rating: 4.3,
        reviews: 680,
        installation: {
            windows: "Download from GitHub or use Docker",
            linux: "sudo apt-get install nikto",
            mac: "brew install nikto"
        },
        usage: [
            "nikto -h target_url  # Basic scan",
            "nikto -h target_url -p 80,443  # Specific ports",
            "nikto -h target_url -C all  # All checks",
            "nikto -h target_url -o report.html  # Generate report"
        ],
        useCases: [
            "Web server security assessment",
            "Quick vulnerability scanning",
            "Compliance testing",
            "Security auditing"
        ],
        pros: [
            "Fast and lightweight",
            "Extensive vulnerability database",
            "Easy command-line usage",
            "Good for quick assessments",
            "Free and open source"
        ],
        cons: [
            "Can be noisy and detectable",
            "Limited to web server scanning",
            "May produce false positives",
            "No GUI interface",
            "Basic reporting capabilities"
        ],
        website: "https://cirt.net/Nikto2",
        documentation: "https://github.com/sullo/nikto/wiki"
    },

    // Malware Analysis Tools
    {
        id: 15,
        name: "Wireshark",
        category: "malware-analysis",
        description: "Network protocol analyzer for capturing and analyzing network traffic in real-time.",
        rating: 4.8,
        reviews: 2200,
        installation: {
            windows: "Download installer from Wireshark website",
            linux: "sudo apt-get install wireshark",
            mac: "brew install --cask wireshark"
        },
        usage: [
            "Select network interface and start capture",
            "Apply display filters (e.g., tcp.port == 80)",
            "Follow TCP streams for detailed analysis",
            "Export objects and statistics"
        ],
        useCases: [
            "Network traffic analysis",
            "Malware communication analysis",
            "Network troubleshooting",
            "Protocol development and testing"
        ],
        pros: [
            "Excellent protocol support",
            "Powerful filtering capabilities",
            "Real-time packet capture",
            "Cross-platform compatibility",
            "Extensive documentation"
        ],
        cons: [
            "Can be overwhelming for beginners",
            "Resource intensive with large captures",
            "Requires network knowledge",
            "May need elevated privileges",
            "GUI can be complex"
        ],
        website: "https://www.wireshark.org",
        documentation: "https://www.wireshark.org/docs/"
    },
    {
        id: 16,
        name: "Cuckoo Sandbox",
        category: "malware-analysis",
        description: "Automated malware analysis system for dynamic analysis in isolated environments.",
        rating: 4.4,
        reviews: 520,
        installation: {
            windows: "Use virtual machine with Linux host",
            linux: "pip install cuckoo or use Docker",
            mac: "Use virtual machine with Linux"
        },
        usage: [
            "cuckoo init  # Initialize Cuckoo",
            "cuckoo submit malware.exe  # Submit sample",
            "cuckoo web  # Start web interface",
            "View analysis reports via web UI"
        ],
        useCases: [
            "Automated malware analysis",
            "Behavioral analysis of suspicious files",
            "Threat intelligence generation",
            "Security research"
        ],
        pros: [
            "Automated analysis workflow",
            "Safe isolated environment",
            "Detailed behavioral reports",
            "API integration capabilities",
            "Multiple analysis modules"
        ],
        cons: [
            "Complex setup and configuration",
            "Requires virtual machine infrastructure",
            "Can be resource intensive",
            "May miss advanced evasion techniques",
            "Limited Windows guest support"
        ],
        website: "https://cuckoosandbox.org",
        documentation: "https://cuckoo.readthedocs.io/"
    },

    // Cryptography Tools
    {
        id: 17,
        name: "Hashcat",
        category: "cryptography",
        description: "Advanced password recovery tool supporting various hash types and attack methods.",
        rating: 4.7,
        reviews: 980,
        installation: {
            windows: "Download from hashcat.net",
            linux: "sudo apt-get install hashcat",
            mac: "brew install hashcat"
        },
        usage: [
            "hashcat -m 0 hashes.txt wordlist.txt  # MD5 dictionary attack",
            "hashcat -m 1000 hashes.txt -a 3 ?a?a?a?a  # NTLM brute force",
            "hashcat -m 2500 capture.hccapx wordlist.txt  # WPA/WPA2",
            "hashcat --show hashes.txt  # Show cracked passwords"
        ],
        useCases: [
            "Password auditing and testing",
            "Digital forensics investigations",
            "Security research",
            "Penetration testing"
        ],
        pros: [
            "GPU acceleration support",
            "Supports many hash types",
            "High performance cracking",
            "Multiple attack modes",
            "Regular updates and improvements"
        ],
        cons: [
            "Requires powerful hardware for best performance",
            "Complex command-line interface",
            "Can be used maliciously",
            "Learning curve for optimization",
            "No built-in wordlists"
        ],
        website: "https://hashcat.net/hashcat/",
        documentation: "https://hashcat.net/wiki/"
    },
    {
        id: 18,
        name: "John the Ripper",
        category: "cryptography",
        description: "Fast password cracker supporting many hash and cipher types for security testing.",
        rating: 4.6,
        reviews: 750,
        installation: {
            windows: "Download from openwall.com",
            linux: "sudo apt-get install john",
            mac: "brew install john"
        },
        usage: [
            "john --wordlist=wordlist.txt hashes.txt",
            "john --incremental hashes.txt  # Brute force",
            "john --show hashes.txt  # Show cracked passwords",
            "unshadow /etc/passwd /etc/shadow > mypasswd"
        ],
        useCases: [
            "Password strength testing",
            "System security auditing",
            "Digital forensics",
            "Penetration testing"
        ],
        pros: [
            "Long-established and reliable",
            "Good CPU optimization",
            "Supports many hash formats",
            "Built-in wordlist generation",
            "Free and open source"
        ],
        cons: [
            "Slower than GPU-based tools",
            "Command-line interface only",
            "Limited modern hash support",
            "Configuration can be complex",
            "Less frequent updates"
        ],
        website: "https://www.openwall.com/john/",
        documentation: "https://www.openwall.com/john/doc/"
    },

    // Wireless Security Tools
    {
        id: 19,
        name: "Aircrack-ng",
        category: "wireless-security",
        description: "Complete suite of tools for wireless network security assessment and WEP/WPA cracking.",
        rating: 4.5,
        reviews: 890,
        installation: {
            windows: "Download from aircrack-ng.org",
            linux: "sudo apt-get install aircrack-ng",
            mac: "brew install aircrack-ng"
        },
        usage: [
            "airmon-ng start wlan0  # Enable monitor mode",
            "airodump-ng wlan0mon  # Capture packets",
            "aireplay-ng -0 5 -a BSSID wlan0mon  # Deauth attack",
            "aircrack-ng -w wordlist.txt capture.cap  # Crack WPA"
        ],
        useCases: [
            "Wireless network security testing",
            "WiFi password auditing",
            "Wireless penetration testing",
            "Network security research"
        ],
        pros: [
            "Comprehensive wireless toolkit",
            "Supports multiple wireless standards",
            "Active development and updates",
            "Cross-platform compatibility",
            "Well-documented commands"
        ],
        cons: [
            "Requires compatible wireless adapter",
            "May need monitor mode support",
            "Can be detected by wireless intrusion detection",
            "Legal restrictions in many jurisdictions",
            "Complex for beginners"
        ],
        website: "https://www.aircrack-ng.org",
        documentation: "https://www.aircrack-ng.org/doku.php"
    },
    {
        id: 20,
        name: "Kismet",
        category: "wireless-security",
        description: "Wireless network detector, sniffer, and intrusion detection system for 802.11 networks.",
        rating: 4.3,
        reviews: 420,
        installation: {
            windows: "Use WSL or virtual machine",
            linux: "sudo apt-get install kismet",
            mac: "brew install kismet"
        },
        usage: [
            "kismet  # Start Kismet server",
            "Access web interface at http://localhost:2501",
            "Configure data sources and channels",
            "Monitor and log wireless activity"
        ],
        useCases: [
            "Wireless network monitoring",
            "Rogue access point detection",
            "Wireless security assessment",
            "Network troubleshooting"
        ],
        pros: [
            "Passive wireless monitoring",
            "Web-based interface",
            "Supports multiple data sources",
            "Real-time network visualization",
            "Extensive logging capabilities"
        ],
        cons: [
            "Complex initial configuration",
            "Requires compatible wireless hardware",
            "Can generate large log files",
            "Learning curve for advanced features",
            "May require root privileges"
        ],
        website: "https://www.kismetwireless.net",
        documentation: "https://www.kismetwireless.net/docs/"
    }
];

// User data storage
let userData = {
    favorites: JSON.parse(localStorage.getItem('cybertools_favorites') || '[]'),
    ratings: JSON.parse(localStorage.getItem('cybertools_ratings') || '{}'),
    reviews: JSON.parse(localStorage.getItem('cybertools_reviews') || '{}'),
    submittedTools: JSON.parse(localStorage.getItem('cybertools_submitted') || '[]')
};

// Save user data to localStorage
function saveUserData() {
    localStorage.setItem('cybertools_favorites', JSON.stringify(userData.favorites));
    localStorage.setItem('cybertools_ratings', JSON.stringify(userData.ratings));
    localStorage.setItem('cybertools_reviews', JSON.stringify(userData.reviews));
    localStorage.setItem('cybertools_submitted', JSON.stringify(userData.submittedTools));
}
