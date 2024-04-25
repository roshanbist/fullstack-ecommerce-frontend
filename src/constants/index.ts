import {
  faFacebook,
  faYoutube,
  faInstagram,
  faTiktok,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { PriceOption, Size, sortTitleOption } from '../types/Product';

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'All Products' },
];

export const footerMenuLinks = [
  { href: '/', label: 'Contact Us' },
  { href: '/', label: 'FAQs' },
  { href: '/', label: 'Payment Policy' },
  { href: '/', label: 'Refund Policy' },
  { href: '/', label: 'Shipping Policy' },
  { href: '/', label: 'Privacy Policy' },
  { href: '/', label: 'Terms & Conditions' },
];

export const socialMediaLinks = [
  {
    icon: faFacebook,
  },
  {
    icon: faYoutube,
  },
  {
    icon: faInstagram,
  },
  {
    icon: faTiktok,
  },
  {
    icon: faXTwitter,
  },
];

export const priceOption: PriceOption[] = [
  { value: '1', label: 'Below €50' },
  { value: '50', label: '€50 to €100' },
  { value: '100', label: '€100 to €150' },
  { value: '150', label: '€150 to €200' },
  { value: '200', label: 'Above €200' },
];

export const sortTitle: sortTitleOption[] = [
  { value: 'asc', label: 'Sort title by ascending' },
  { value: 'desc', label: 'Sort title by descending' },
];

export const productSize = ['S', 'M', 'L'];
