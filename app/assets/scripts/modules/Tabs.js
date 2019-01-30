import $ from 'jquery';

class Tabs {
    constructor() {
        this.tabLinks = $('.tabs__tab-links');
        this.tabContent = $('.tabs__content');
        this.tabDrawers = $('.tabs__tab_drawer');
        this.events();
    }

    events() {
        this.tabLinks.click(this.currentTab.bind(this.tabLinks, this.tabContent));
    }


    currentTab(a, b) {
        var activeLink = $(b.target);
        var allTabLinks = this;
        var allContentTabs = $(a);

        function ClearActiveTabs() {
            allTabLinks.removeClass('tabs--current-link');
            allContentTabs.removeClass('tabs--current-tab');
        }

        var currentTabContentId = activeLink.attr('data-tab');
        var activeContent = $('#' + currentTabContentId);

        if (activeLink.hasClass('tabs--current-link')) {
            if (activeLink.hasClass('tabs__tab_drawer')) {
                ClearActiveTabs();
            }
        } else {
            var syncLinkValue = activeLink.attr('data-link');
            var matchingActiveLinks = $("[data-link=" + syncLinkValue + "]");

            ClearActiveTabs();

            matchingActiveLinks.addClass('tabs--current-link');
            activeContent.addClass('tabs--current-tab');

            activeLink.get(0).scrollIntoView();

        }
    }
}
export default Tabs;