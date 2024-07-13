import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, G, Circle, Path, Text as SvgText } from 'react-native-svg';
import appColors from '../assets/colors/appColors';

// Helper function to convert percentage to angle
const percentageToAngle = (percent) => (percent / 100) * 360;

// Helper function to describe a segment of the donut
const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const d = [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');

  return d;
};

// Helper function to convert polar coordinates to cartesian
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

const DonutChart = ({ data, size = 200 }) => {

  const center = size / 2;
  const radius = (size - 20) / 2; // padding 10 from each side
  const strokeWidth = 20;

  // Calculate total value
  const total = data.reduce((sum, item) => sum + item.value, 0) ;

  // Convert data to segments
  const segments = data.map((item, index, arr) => {
    const valuePercentage = (item.value / total) * 100;
    const startAngle = index === 0 ? 0 : percentageToAngle(arr.slice(0, index).reduce((sum, segment) => sum + (segment.value / total) * 100, 0));
    const endAngle = startAngle + percentageToAngle(valuePercentage);

    return {
      ...item,
      startAngle,
      endAngle,
    };
  });

  return (
    <View style={styles.container}>
      {
        (Array.isArray(data) && data.length == 0) ?
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <G rotation="-90" origin={`${center}, ${center}`}>
              <Path
                d={describeArc(center, center, radius, 0, 360)}
                fill="none"
                stroke="green" // default color for empty data
                // strokeWidth={strokeWidth}
              />
            </G>
            <Circle strokeWidth={strokeWidth/2} stroke={appColors.primary} cx={center} cy={center} r={radius - strokeWidth} fill="white" />
            <SvgText
              x={center}
              y={center}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize={14}
              fill="black"
            >
              No Data
            </SvgText>
            <SvgText
              x={center}
              y={center }
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize={14}
              fill="black"
              fontWeight="bold"
            >
              {/* expense */}
            </SvgText>
          </Svg> :  <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G rotation="-90" origin={`${center}, ${center}`}>
          {segments.map((segment, index) => (
            <Path
              key={index}
              d={describeArc(center, center, radius, segment.startAngle, segment.endAngle)}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
            />
          ))}
        </G>
        <Circle cx={center} cy={center} r={radius - strokeWidth} fill="white" />
        <SvgText
          x={center}
          y={center - 10}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={14}
          fill="black"
        >
          Count
        </SvgText>
        <SvgText
          x={center}
          y={center + 10}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={14}
          fill="black"
          fontWeight="bold"
        >
           {total}
        </SvgText>
      </Svg>
      }
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DonutChart;
