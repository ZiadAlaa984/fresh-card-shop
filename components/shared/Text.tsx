type TypographyProps = {
  className?: string;
  children: React.ReactNode;
};

export function TypographyH1({ className = "", children }: TypographyProps) {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({ className = "", children }: TypographyProps) {
  return (
    <h2
      className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({ className = "", children }: TypographyProps) {
  return (
    <h3
      className={`scroll-m-20 text-base lg:text-2xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({ className = "", children }: TypographyProps) {
  return (
    <h4
      className={`scroll-m-20 line-clamp-1 text-[16px] md:text-xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h4>
  );
}

export function TypographyP({ className = "", children }: TypographyProps) {
  return (
    <p
      className={`leading-7 line-clamp-1 text-[12px] md:text-[16px]  ${className}`}
    >
      {children}
    </p>
  );
}
