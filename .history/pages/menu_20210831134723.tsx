import React from 'react'
import { Container } from '../primitives/Container'
import { Section } from '../primitives/Section'
import { Heading } from '../primitives/Heading'
import { TextField } from '../primitives/TextField'
import { Box }


const Menu = () => {

    return (
        <Section size="3">
          <Container size="2">
            <Heading id="container" css={{ mb: '$6', scrollMarginTop: '$7' }}>
              Container
            </Heading>
          </Container>
          <Container size="1">
            <Box
              css={{
                p: '$5',
                border: '1px solid $slate6',
                borderRadius: '$3',
              }}
            >
                <form>
                    <TextField
                      type="email"
                      size="3"
                      placeholder="Email"
                      autoComplete="off"
                      css={{ mb: '$3' }}
                    />
                    <TextField
                      type="password"
                      size="3"
                      placeholder="Password"
                      autoComplete="off"
                      css={{ mb: '$3' }}
                    />
                    <Flex css={{ ai: 'center', jc: 'space-between' }}>
                        <Text size="2" css={{ color: '$slate11' }}>
                            Forgot password
                        </Text>
                        <Button size="2" variant="blue">
                            Log in
                        </Button>
                    </Flex>
                </form>
            </Box>
          </Container>
        </Section>

    )

}

export default Menu;