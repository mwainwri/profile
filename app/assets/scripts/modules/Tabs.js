import $ from 'jquery';

class Tabs {
    constructor() {
    this.tabLinks = $('ul.tabs__tab-links-wrapper li');
    this.tabContent = $('.tabs__content');
    this.events(); 
    }


events() {
        this.tabLinks.click(this.hideInactiveTabs.bind(this));
        this.tabLinks.click(this.currentTab);
}

hideInactiveTabs() {
    this.tabContent.removeClass('tabs--current-tab');
    this.tabLinks.removeClass('tabs--current-link');
 }

currentTab() {
    var current_tab_link_id = this.id;
    var current_tab_content_id =  $('#' + current_tab_link_id).attr('data-tab');
   
    $('#' + current_tab_link_id).addClass('tabs--current-link');
    $('#' + current_tab_content_id).addClass('tabs--current-tab');
}

}
export default Tabs;