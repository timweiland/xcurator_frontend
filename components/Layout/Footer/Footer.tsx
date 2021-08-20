import Link from "next/link";

import { BeakerIcon } from "@heroicons/react/solid";

// TODO: Replace with real xCurator logo
const XCuratorLogo = (props): JSX.Element => <BeakerIcon {...props} />;

interface Link {
  name: string;
  href: string;
  left: boolean;
}

const links: Link[] = [
  { name: "About the project", href: "about", left: true },
  { name: "Allard Pierson", href: "https://allardpierson.nl/", left: true },
  {
    name: "Baden State Museum",
    href: "https://www.landesmuseum.de/",
    left: true,
  },
  { name: "Help Desk", href: "", left: false },
  { name: "Join development", href: "", left: false },
  { name: "Imprint", href: "", left: false },
];

const SimpleLink = (link: Link): JSX.Element => (
  <Link href={link.href} key={link.name}>
    <a className="mx-3 font-semibold">{link.name}</a>
  </Link>
);

const RowLink = (link: Link): JSX.Element => (
  <Link href={link.href} key={link.name}>
    <a className="font-semibold after:content-['|'] after:mx-1 last:after:content-['']">
      {link.name}
    </a>
  </Link>
);

const LinkList = (): JSX.Element => (
  <>
    {/* Mobile */}
    <nav className="flex flex-col w-full px-5 h-20 md:hidden">
      <div className="flex items-center justify-center py-2">
        <XCuratorLogo className="w-5 h-5" />
      </div>
      <div className="flex flex-wrap items-center justify-center">
        {links.map(RowLink)}
      </div>
    </nav>

    {/* Desktop */}
    <nav className="hidden md:grid grid-cols-5 w-full px-20 h-10">
      <div className="col-span-2 flex items-center justify-center">
        {links.filter((link) => link.left).map(SimpleLink)}
      </div>
      <div className="flex items-center justify-center">
        <XCuratorLogo className="w-5 h-5" />
      </div>
      <div className="col-span-2 flex items-center justify-center">
        {links.filter((link) => !link.left).map(SimpleLink)}
      </div>
    </nav>
  </>
);

const Footer = (): JSX.Element => (
  <footer className="flex items-center justify-center w-full h-24 border-t py-2">
    <LinkList />
  </footer>
);

export default Footer;
