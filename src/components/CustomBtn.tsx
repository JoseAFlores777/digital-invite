"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { ShineBorder } from "@/components/ui/shine-border";

export type CustomBtnVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "tertiary"
  | "outline"
  | "filled";

export type CustomBtnSize = "xs" | "sm" | "md" | "lg" | "xl";

type BaseProps = {
  className?: string;
  label?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  variant?: CustomBtnVariant;
  size?: CustomBtnSize; // tamaño del botón
  shine?: boolean; // activa efecto de ShineBorder (borde animado)
  ariaLabel?: string;
  disabled?: boolean;
  children?: React.ReactNode; // opcional para contenido totalmente custom
};

type AnchorProps = {
  href: string;
  onClick?: never;
  target?: string;
  rel?: string;
  type?: never;
};

type ButtonProps = {
  href?: never;
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  target?: never;
  rel?: never;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]; // e.g., "button" | "submit"
};

export type CustomBtnProps = BaseProps & (AnchorProps | ButtonProps);

function variantClasses(variant: CustomBtnVariant = "primary") {
  // Mantener consistencia con la paleta dusty y estilos existentes
  switch (variant) {
    case "primary":
      return "bg-[color:var(--color-dusty-600)] text-white hover:bg-[color:var(--color-dusty-700)]";
    case "secondary":
      return "bg-[color:var(--color-dusty-100)] text-[color:var(--color-dusty-900)] hover:bg-[color:var(--color-dusty-200)]";
    case "danger":
      return "bg-red-600 text-white hover:bg-red-700";
    case "warning":
      return "bg-amber-500 text-black hover:bg-amber-600";
    case "tertiary":
      return "bg-transparent text-[color:var(--color-dusty-800)] hover:bg-[color:var(--color-dusty-100)]";
    case "outline":
      return "bg-white text-[color:var(--color-dusty-900)] border border-neutral-300 hover:bg-neutral-50";
    case "filled":
      return "bg-neutral-900 text-white hover:bg-neutral-800";
    default:
      return "bg-[color:var(--color-dusty-600)] text-white hover:bg-[color:var(--color-dusty-700)]";
  }
}

function Wrapper({ children, shine }: { children: React.ReactNode; shine?: boolean }) {
  return (
    <span className="relative inline-block rounded-xl">
      {children}
      {shine ? (
        <ShineBorder
          aria-hidden
          borderWidth={2}
          duration={12}
          shineColor={["#9cb3c7", "#dee8f2", "#b3c7db"]}
          className="pointer-events-none"
        />
      ) : null}
    </span>
  );
}

function CustomBtn(props: CustomBtnProps) {
  const {
    className = "",
    label,
    icon,
    iconPosition = "left",
    variant = "outline",
    size = "md",
    shine = false,
    ariaLabel,
    disabled,
    children,
    // discriminated
    href,
    onClick,
    target,
    rel,
    type = "button",
  } = props as CustomBtnProps & Partial<AnchorProps & ButtonProps>;

  const sizeMap: Record<CustomBtnSize, { container: string; icon: string; label: string }> = {
    xs: { container: "px-3 py-1.5 text-xs", icon: "w-4 h-4", label: "text-xs" },
    sm: { container: "px-4 py-2 text-sm", icon: "w-4 h-4", label: "text-sm" },
    md: { container: "px-5 py-2.5 text-sm", icon: "w-5 h-5", label: "text-sm" },
    lg: { container: "px-6 py-3 text-base", icon: "w-6 h-6", label: "text-base" },
    xl: { container: "px-7 py-3.5 text-lg", icon: "w-6 h-6", label: "text-lg" },
  };
  const sizeClasses = sizeMap[size] || sizeMap.md;

  const content = (
    <span className={cn("inline-flex items-center gap-2", disabled ? "opacity-60" : undefined)}>
      {icon && iconPosition === "left" ? (
        <Icon icon={icon} className={sizeClasses.icon} aria-hidden />
      ) : null}
      {label ? <span className={cn("truncate", sizeClasses.label)}>{label}</span> : null}
      {children}
      {icon && iconPosition === "right" ? (
        <Icon icon={icon} className={sizeClasses.icon} aria-hidden />
      ) : null}
    </span>
  );

  const commonClasses = cn(
    "relative inline-flex select-none items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    sizeClasses.container,
    variantClasses(variant),
    disabled ? "pointer-events-none cursor-not-allowed" : "cursor-pointer",
    className
  );

  if (href) {
    const aRel = rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);
    return (
      <Wrapper shine={shine}>
        <a
          href={href}
          target={target}
          rel={aRel}
          aria-label={ariaLabel || label}
          className={commonClasses}
          onClick={undefined}
        >
          {content}
        </a>
      </Wrapper>
    );
  }

  return (
    <Wrapper shine={shine}>
      <button
        type={type}
        aria-label={ariaLabel || label}
        className={commonClasses}
        onClick={onClick}
        disabled={disabled}
      >
        {content}
      </button>
    </Wrapper>
  );
}

export default React.memo(CustomBtn);
