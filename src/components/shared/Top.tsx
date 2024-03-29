import { css } from '@emotion/react'
import React from 'react'
import Flex from './Flex'
import Text from './Text'

interface TopProps {
  title: string
  subtitle: string
}

function Top({ title, subtitle }: TopProps) {
  return (
    <Flex direction="column" css={containerStyles}>
      <Text typography="t4" bold>
        {title}
      </Text>
      <Text typography="t7">{subtitle}</Text>
    </Flex>
  )
}

const containerStyles = css`
  padding: 24px;
`

export default Top
