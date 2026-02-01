import React from 'react'
import { View, Text } from 'react-native'
import { EmploymentTimelineStyles, colors } from '../EmploymentTimeline.styles.js'

export function Legend() {
  return (
    <View style={EmploymentTimelineStyles.legend}>
      <View style={[EmploymentTimelineStyles.legendItem, { marginRight: 12 }]}>
        <View
          style={[
            EmploymentTimelineStyles.legendDot,
            { backgroundColor: colors.active },
          ]}
        />
        <Text style={[EmploymentTimelineStyles.legendText, { marginLeft: 6 }]}>Active</Text>
      </View>
      <View style={[EmploymentTimelineStyles.legendItem, { marginRight: 12 }]}>
        <View
          style={[
            EmploymentTimelineStyles.legendDot,
            { backgroundColor: colors.company },
          ]}
        />
        <Text style={[EmploymentTimelineStyles.legendText, { marginLeft: 6 }]}>Company</Text>
      </View>
      <View style={EmploymentTimelineStyles.legendItem}>
        <View
          style={[
            EmploymentTimelineStyles.legendDot,
            { backgroundColor: colors.highlight },
          ]}
        />
        <Text style={[EmploymentTimelineStyles.legendText, { marginLeft: 6 }]}>Tech / highlights</Text>
      </View>
    </View>
  )
}
