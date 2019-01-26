import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';
class Tabs {
    constructor() {
    this.tabLinks = $('ul.tabs__tab-links-wrapper li');
    this.tabContent = $('.tabs__content');
    this.tabDrawers = $('.tabs__tab_drawer');
    this.events(); 
    }


events() {
        this.tabLinks.click(this.currentTab);
        this.tabDrawers.click(this.currentTab);
}

currentTab() {
    var current_tab_link_id = this.id;
    var current_tab_content_id =  $('#' + current_tab_link_id).attr('data-tab');

    var active_link = $('#' + current_tab_link_id);
    var active_content =  $('#' + current_tab_content_id)
       
        if (active_link.hasClass('tabs--current-link')){
            if (active_link.hasClass('tabs__tab_drawer')){ 
                active_link.removeClass('tabs--current-link');
                active_content.removeClass('tabs--current-tab');
            } 
        } else {
            active_link.addClass('tabs--current-link').siblings().removeClass('tabs--current-link');
            active_content.addClass('tabs--current-tab').siblings().removeClass('tabs--current-tab');
            console.log(active_content.siblings());
        }
}

}
export default Tabs;
