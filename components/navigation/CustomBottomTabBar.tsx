import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width } = Dimensions.get('window');
const tabBarHeight = 30;

const CustomBottomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const colorScheme = useColorScheme() || 'light';

  return (
    <View style={styles.container}>
      <Svg width={width} height={tabBarHeight + 30} viewBox={`0 0 ${width} ${tabBarHeight + 30}`}>
        <Path
          d={`M0 0 L${width / 2 - 40} 0 Q${width / 2} 60 ${width / 2 + 40} 0 L${width} 0 L${width} ${tabBarHeight + 30} L0 ${tabBarHeight + 30} Z`}
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="1"
        />
      </Svg>
      <View style={styles.content}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : typeof options.title === 'string'
              ? options.title
              : route.name;

          return route.name === 'scannow' ? (
            <View key={index} style={styles.placeholderTab}>
              <Text style={styles.scanLabel}>Scan Now</Text>
            </View>
          ) : (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({
                  color: isFocused ? '#9747FF' : 'black',
                  focused: isFocused,
                  size: 24,
                })}
              <Text style={{ color: isFocused ? '#9747FF' : 'black', fontSize: 12 }}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: tabBarHeight + 30,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width,
    paddingBottom: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: '10%',
    left: 0,
    right: 0,
    height: tabBarHeight,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderTab: {
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanLabel: {
    marginTop: 0,
    color: 'black',
    fontSize: 12,
    width: 58
  },
});

export default CustomBottomTabBar;
