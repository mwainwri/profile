import $ from 'jquery';

class Tabs {
    constructor() {
        this.tabLinks = $('.tabs__tab-links');
        this.tabContent = $('.tabs__content');
        this.tabDrawers = $('.tabs__tab_drawer');
        this.events();
    }


    events() {
        this.tabLinks.click(this.currentTab);
    }

    currentTab() {


       function ClearActiveTabs() {
            var allTabLinks = $('.tabs__tab-links');
            var allTabContnet = $('.tabs__content');
            allTabLinks.removeClass('tabs--current-link');
            allTabContnet.removeClass('tabs--current-tab');
        }

        var activeLink = $(this);
        var current_tab_content_id = activeLink.attr('data-tab');
        var activeContent = $('#' + current_tab_content_id);

        if (activeLink.hasClass('tabs--current-link')) {
            if (activeLink.hasClass('tabs__tab_drawer')) {
                ClearActiveTabs();
            }
        } else {
            ClearActiveTabs();
            var syncLinkValue = activeLink.attr('data-link');
           
            
            var matchingActiveLinks =  $( "[data-link=" + syncLinkValue + "]" );
            matchingActiveLinks.addClass('tabs--current-link');
            console.log(matchingActiveLinks);
            
            //activeLink.addClass('tabs--current-link');
            activeContent.addClass('tabs--current-tab');
        }
    }
}
export default Tabs;