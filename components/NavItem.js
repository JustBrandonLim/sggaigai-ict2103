import Link from "next/link";

export default function NavItem(props) {
  return (
    <li>
      <Link href={props.href}>
        <a>
          <span className="flex items-center gap-3">{props.children}</span>
        </a>
      </Link>
    </li>
  );
}
