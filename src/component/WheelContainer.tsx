import type { Category } from "../ulits/staticData";

const WheelContainer = ({
  rotation,
  categories,
  segmentAngle,
  dimensions,
  screenSize,
}: {
  rotation: number;
  categories: Category[];
  segmentAngle: number;
  dimensions: {
    size: number;
    centerSize: number;
    outerRadius: number;
    innerRadius: number;
  };
  screenSize: string;
}) => {
  return (
    <div
      className="absolute inset-0 transition-transform duration-500 ease-out"
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center center",
      }}
    >
      {/* Segments */}
      {categories?.map((category, index) => {
        const startAngle = index * segmentAngle - 90; // Start from top
        const endAngle = (index + 1) * segmentAngle - 90;
        const midAngle = (startAngle + endAngle) / 2;

        // Calculate path for segment
        const outerStartX =
          dimensions.size / 2 +
          dimensions.outerRadius * Math.cos((startAngle * Math.PI) / 180);
        const outerStartY =
          dimensions.size / 2 +
          dimensions.outerRadius * Math.sin((startAngle * Math.PI) / 180);
        const outerEndX =
          dimensions.size / 2 +
          dimensions.outerRadius * Math.cos((endAngle * Math.PI) / 180);
        const outerEndY =
          dimensions.size / 2 +
          dimensions.outerRadius * Math.sin((endAngle * Math.PI) / 180);

        const innerStartX =
          dimensions.size / 2 +
          dimensions.innerRadius * Math.cos((startAngle * Math.PI) / 180);
        const innerStartY =
          dimensions.size / 2 +
          dimensions.innerRadius * Math.sin((startAngle * Math.PI) / 180);
        const innerEndX =
          dimensions.size / 2 +
          dimensions.innerRadius * Math.cos((endAngle * Math.PI) / 180);
        const innerEndY =
          dimensions.size / 2 +
          dimensions.innerRadius * Math.sin((endAngle * Math.PI) / 180);

        const largeArcFlag = segmentAngle > 180 ? 1 : 0;

        const pathData = [
          `M ${outerStartX} ${outerStartY}`,
          `A ${dimensions.outerRadius} ${dimensions.outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`,
          `L ${innerEndX} ${innerEndY}`,
          `A ${dimensions.innerRadius} ${dimensions.innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`,
          "Z",
        ].join(" ");

        return (
          <>
            {/* Segment Shape */}
            <svg
              className="absolute w-full h-full pointer-events-none"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Clicked on ${category.name} (${category.id})`);
                // window.location.href = `/${category.id}`;
              }}
            >
              <defs>
                <clipPath id={`clip-${category.id}`}>
                  <path d={pathData} />
                </clipPath>
              </defs>

              {/* White background */}
              <path
                d={pathData}
                fill="white"
                stroke="#e5e7eb"
                strokeWidth="2"
              />

              {/* Colored band */}
              <path
                d={[
                  `M ${outerStartX} ${outerStartY}`,
                  `A ${dimensions.outerRadius} ${dimensions.outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`,
                  `L ${
                    dimensions.size / 2 +
                    (dimensions.outerRadius -
                      (screenSize == "desktop"
                        ? 40
                        : screenSize == "tv"
                        ? 60
                        : 30)) *
                      Math.cos((endAngle * Math.PI) / 180)
                  } ${
                    dimensions.size / 2 +
                    (dimensions.outerRadius -
                      (screenSize == "desktop"
                        ? 40
                        : screenSize == "tv"
                        ? 60
                        : 30)) *
                      Math.sin((endAngle * Math.PI) / 180)
                  }`,
                  `A ${
                    dimensions.outerRadius -
                    (screenSize == "desktop"
                      ? 40
                      : screenSize == "tv"
                      ? 60
                      : 30)
                  } ${
                    dimensions.outerRadius -
                    (screenSize == "desktop"
                      ? 40
                      : screenSize == "tv"
                      ? 60
                      : 30)
                  } 0 ${largeArcFlag} 0 ${
                    dimensions.size / 2 +
                    (dimensions.outerRadius -
                      (screenSize == "desktop"
                        ? 40
                        : screenSize == "tv"
                        ? 60
                        : 30)) *
                      Math.cos((startAngle * Math.PI) / 180)
                  } ${
                    dimensions.size / 2 +
                    (dimensions.outerRadius -
                      (screenSize == "desktop"
                        ? 40
                        : screenSize == "tv"
                        ? 60
                        : 30)) *
                      Math.sin((startAngle * Math.PI) / 180)
                  }`,
                  "Z",
                ].join(" ")}
                fill={category.color}
              />
            </svg>

            {/* Clickable Area - Invisible div covering the segment */}
            <div
              className="absolute cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                clipPath: `path('${pathData}')`,
                width: dimensions.size,
                height: dimensions.size,
                left: 0,
                top: 0,
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Clicked on ${category.name} (${category.id})`);
                window.location.href = `/${category.id}`;
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(
                  `Touch clicked on ${category.name} (${category.id})`
                );
                window.location.href = `/${category.id}`;
              }}
            />

            {/* Category Label */}
            <div
              className="absolute text-white font-bold text-center pointer-events-none leading-tight"
              style={{
                left:
                  dimensions.size / 2 +
                  (dimensions.outerRadius - (screenSize === "tv" ? 30 : 20)) *
                    Math.cos((midAngle * Math.PI) / 180) -
                  (screenSize === "mobile"
                    ? 40
                    : screenSize === "tv"
                    ? 80
                    : 60),
                top:
                  dimensions.size / 2 +
                  (dimensions.outerRadius -
                    (screenSize === "tv"
                      ? 30
                      : screenSize == "desktop"
                      ? 20
                      : 15)) *
                    Math.sin((midAngle * Math.PI) / 180) -
                  (screenSize === "mobile" ? 8 : screenSize === "tv" ? 16 : 12),
                width:
                  screenSize === "mobile"
                    ? 80
                    : screenSize === "tv"
                    ? 160
                    : 120,
                fontSize:
                  screenSize === "mobile"
                    ? "8px"
                    : screenSize === "tablet"
                    ? "10px"
                    : screenSize === "tv"
                    ? "18px"
                    : "12px",
                transform: `rotate(${midAngle + 90}deg)`,
                transformOrigin: "center center",
                textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
                fontWeight: screenSize === "tv" ? "800" : "bold",
              }}
            >
              {category.name}
            </div>

            {/* Product Image */}
            <div
              className="absolute pointer-events-none"
              style={{
                left:
                  dimensions.size / 2 +
                  ((dimensions.outerRadius + dimensions.innerRadius) / 2) *
                    Math.cos((midAngle * Math.PI) / 180) -
                  (screenSize === "mobile"
                    ? 25
                    : screenSize === "tv"
                    ? 60
                    : screenSize == "desktop"
                    ? 40
                    : 60),
                top:
                  dimensions.size / 2 +
                  ((dimensions.outerRadius + dimensions.innerRadius) / 2) *
                    Math.sin((midAngle * Math.PI) / 180) -
                  (screenSize === "mobile"
                    ? 25
                    : screenSize === "tv"
                    ? 60
                    : 40),
                width:
                  screenSize === "mobile" ? 50 : screenSize === "tv" ? 120 : 80,
                height:
                  screenSize === "mobile" ? 50 : screenSize === "tv" ? 120 : 80,
                transform: `rotate(${-rotation}deg)`,
                transformOrigin: "center center",
              }}
            >
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-contain"
              />
            </div>
          </>
        );
      })}
    </div>
  );
};

export default WheelContainer;
