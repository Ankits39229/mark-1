// Test script for gooey menu functionality
console.log('Gooey Menu Test Script Loaded');

// Test function to verify menu is working
function testGooeyMenu() {
    const menuContainer = document.getElementById('gooey-menu-bottom-right');
    if (menuContainer) {
        console.log('✅ Gooey menu container found');
        
        const toggleButton = menuContainer.querySelector('.gooey-menu-toggle');
        if (toggleButton) {
            console.log('✅ Toggle button found');
            
            const menuItems = menuContainer.querySelectorAll('.gooey-menu-item');
            console.log(`✅ Found ${menuItems.length} menu items`);
            
            // Test toggle functionality
            setTimeout(() => {
                console.log('🧪 Testing menu toggle...');
                toggleButton.click();
                
                setTimeout(() => {
                    toggleButton.click();
                    console.log('✅ Menu toggle test complete');
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
