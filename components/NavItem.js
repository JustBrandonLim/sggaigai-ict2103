import Link from "next/link";

export default function NavItem(props) {
  return (
    <li>
      <Link href={props.href}>
        <span className="flex items-center gap-3">{props.children}</span>
      </Link>
    </li>
  );
}
