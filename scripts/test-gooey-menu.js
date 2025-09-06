// Test script for gooey menu functionality
console.log('Gooey Menu Test Script Loaded - Left Direction with 3 Buttons');

// Test function to verify menu is working
function testGooeyMenu() {
    const menuContainer = document.getElementById('gooey-menu-bottom-right');
    if (menuContainer) {
        console.log('✅ Gooey menu container found');
        
        const toggleButton = menuContainer.querySelector('.gooey-menu-toggle');
        if (toggleButton) {
            console.log('✅ Toggle button found');
            
            const menuItems = menuContainer.querySelectorAll('.gooey-menu-item');
            console.log(`✅ Found ${menuItems.length} menu items (expected: 3)`);
            
            // List the menu items
            menuItems.forEach((item, index) => {
                const value = item.getAttribute('data-value');
                const label = item.getAttribute('aria-label');
                console.log(`   ${index + 1}. ${label} (${value})`);
            });
            
            // Test toggle functionality
            setTimeout(() => {
                console.log('🧪 Testing menu toggle (left direction)...');
                toggleButton.click();
                
                setTimeout(() => {
                    toggleButton.click();
                    console.log('✅ Menu toggle test complete');
                    console.log('🎨 Try clicking the theme button to test dark/light mode!');
                }, 2000);
            }, 3000);
        } else {
            console.log('❌ Toggle button not found');
        }
    } else {
        console.log('❌ Gooey menu container not found');
    }
}

// Run test when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(testGooeyMenu, 1000);
    });
} else {
    setTimeout(testGooeyMenu, 1000);
}
