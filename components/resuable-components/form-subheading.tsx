import React from 'react';

type FormSubHeadingProps = {
  title:string;
  description:string;
}

function FormSubHeading({title, description}:FormSubHeadingProps) {
  return (
    <div className="">
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
  )
}

export default FormSubHeading