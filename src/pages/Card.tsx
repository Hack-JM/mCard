import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'

import { getCard } from '@/remote/card'
import Top from '@shared/Top'
import ListRow from '@shared/ListRow'
import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import Text from '@shared/Text'

function CardPage() {
  const params = useParams()
  const { id = '' } = params

  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '', // 아이디가 빈 값이 아닌 경우만 호출
  })

  if (data == null) {
    return null
  }

  const { name, corpName, promotion, tags, benefit } = data

  const subtitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(', ')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subtitle={subtitle} />

      <ul>
        {benefit.map((text, index) => (
          <motion.li
            initial={{
              opacity: 0,
              translateX: -90,
            }}
            transition={{
              duration: 0.7,
              delay: index * 0.1,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
          >
            <ListRow
              key={text}
              left={<IconCheck />}
              as="div"
              contents={
                <ListRow.Texts title={`혜택 ${index + 1}`} subtitle={text} />
              }
            />
          </motion.li>
        ))}
      </ul>

      {promotion != null ? (
        <Flex direction="column" css={termsContainerStyles}>
          <Text bold>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}

      <FixedBottomButton label="신청하기" onClick={() => {}} />
    </div>
  )
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={20}>
      <path
        d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        fill="#6563ff"
      />
    </svg>
  )
}

function removeHtmlTags(text: string) {
  let output = ''

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      for (let j = i + 1; j < text.length; j++) {
        if (text[j] === '>') {
          i = j
          break
        }
      }
    } else {
      output += text[i]
    }
  }

  return output
}

const termsContainerStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px;
`

export default CardPage
