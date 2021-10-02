import * as React from "react"

interface FlexboxProps {
  className?: string;
  inline?: boolean;
  vertical?: boolean;
  wrap?: boolean;
  noGrow?: boolean;
  grow?: number;
  shrink?: number;
  basis?: number | "auto";
  children?: React.ReactNode;
  top?: boolean;
  middle?: boolean;
  bottom?: boolean;
  left?: boolean;
  center?: boolean;
  right?: boolean;
  between?: boolean;
  around?: boolean;
  gap?: boolean | number;
};

const getFlexProperties = (props: FlexboxProps) => {
  const {
    top,
    middle,
    bottom,
    left,
    center,
    right,
    between,
    around,
    vertical,
    gap
  } = props;

  let primaryAxis = "initial";
  let secondaryAxis = "initial";
  let gridGap: string | number = "none";


  if (left || center || right || between || around) {
    if (left) {
      primaryAxis = "flex-start";
    } else if (center) {
      primaryAxis = "center";
    } else if (right) {
      primaryAxis = "flex-end";
    } else if (between) {
      primaryAxis = "space-between";
    } else if (around) {
      primaryAxis = "space-around";
    }
  }

  if (top || middle || bottom) {
    if (top) {
      secondaryAxis = "flex-start";
    } else if (middle) {
      secondaryAxis = "center";
    } else if (bottom) {
      secondaryAxis = "flex-end";
    }
  }

  if (vertical) {
    if (left || center || right) {
      if (left) {
        secondaryAxis = "flex-start";
      } else if (center) {
        secondaryAxis = "center";
      } else if (right) {
        secondaryAxis = "flex-end";
      }
    }

    if (top || middle || bottom || between || around) {
      if (top) {
        primaryAxis = "flex-start";
      } else if (middle) {
        primaryAxis = "center";
      } else if (bottom) {
        primaryAxis = "flex-end";
      } else if (between) {
        primaryAxis = "space-between";
      } else if (around) {
        primaryAxis = "space-around";
      }
    }
  }

  if (gap) {
    if (gap == true) {
      gridGap = 2;
    } else {
      gridGap = gap;
    }
  }

  return {
    justifyContent: primaryAxis,
    alignItems: secondaryAxis,
    "& > * + *": {
      marginLeft: props.gap && !props.vertical && gridGap,
      marginTop: props.gap && props.vertical && gridGap
    } as any
  };
}

export const FlexPanel: React.FC<FlexboxProps> = (props) =>  {
    let { inline, vertical, wrap, noGrow, className, children } = props

    return (
        <div 
            style={{
                margin: 0, 
                padding: '$2',
                border: 'thin solid $border',
                borderRadius: '$2',
                backgroundColor: '$panel',
                color: '$text',
                display: inline ? "inline-flex" : "flex",
                flexDirection: vertical ? "column" : "row",
                flexWrap: wrap ? "wrap" : "nowrap",
                flex: noGrow ? `0 0 auto` : `1 1 auto`,
                ...getFlexProperties(props)
            }}
            className={className}
        >
            <div>
                {children}
            </div>
        </div>
    );
}

export const FlexBox: React.FC<FlexboxProps> = props => {
    //TODO: import useColors() and prepend className to the parameter below
    return (
        <div
            style={{
                display: props.inline ? "inline-flex" : "flex",
                flexDirection: props.vertical ? "column" : "row",
                flexWrap: props.wrap ? "wrap" : "no-wrap",
                flex: props.noGrow ? `0 0 auto` : `1 1 auto`,
                ...getFlexProperties(props)
            }}
            className={props.className}
        >
            {props.children}
        </div>
    );
}

