import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import $ from "jquery";
import Modal from "./modules/Modal";
import Tabs from "./modules/Tabs";

//import React from 'react';
//import YouTube from 'react-youtube';
//import ReactYouTube from "./modules/YouTube"


var tabs = new Tabs();
var mobileMenu = new MobileMenu();
new RevealOnScroll($(".feature-item"), "85%");
new RevealOnScroll($(".testimonial"), "60%");
var modal = new Modal();
//var youtube = new  ReactYouTube();
