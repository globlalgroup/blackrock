export function CryptoCom(props: React.SVGAttributes<{}>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="24" height="24" {...props}>
      <style>
        {`
          .st0 { fill: none; }
          .st1 { fill: #FFFFFF; }
          .st2 { fill: #03316C; }
        `}
      </style>
      <rect y="0" className="st0" width="500" height="500" />
      <path
        className="st1"
        d="M250,0L33.4,125v250L250,500l216.6-125V125L250,0Z"
      />
      <path
        className="st2"
        d="M335.5,402.3h-30.8L268,368.5v-17.4l38.2-36.5v-57.9l49.9-32.6l56.8,42.9L335.5,402.3Z
          M207.9,311.2l5.6-54.3l-18.7-48.7h110.4l-18.3,48.7l5.2,54.3h-42.6H207.9Z
          M233.1,368.5l-36.9,34.3h-31.2L40,231.3l57.2-42.5l50.3,32v57.9l38.2,36.5Z
          M163.8,108.1h170.6l20.4,86.9H143.3Z"
      />
    </svg>
  );
}