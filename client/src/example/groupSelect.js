import React from "react"
import { Box, Flex } from "rebass";
import AnimatedMulti from "../components/AnimatedSelect";

const GroupSelect = ({ errors, groupsTest, setFieldValue, setFieldTouched, theBreaks, touched }) => {
        <Flex>
          <Box width={theBreaks}>
            <label htmlFor="groupsTest" >
              groupsTest
            </label>
            <AnimatedMulti
              name="groupsTest"
              value={groupsTest[0]["value"]}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.groupsTest}
              styles={groupsTest}
              touched={touched.groupsTest}
              colourOptions={groupsTest}
              isMulti={true}
              defaultValues={[{...groupsTest[0]},{...groupsTest[1]}]}
            />
          </Box>
        </Flex>
      };

export { GroupSelect };