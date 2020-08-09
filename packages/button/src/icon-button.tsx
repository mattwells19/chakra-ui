import { __DEV__ } from "@chakra-ui/utils"
import React, { ReactElement, isValidElement, cloneElement } from "react"
import { Button, ButtonProps } from "./button"
import { forwardRef } from "@chakra-ui/system"

type Omitted =
  | "leftIcon"
  | "isFullWidth"
  | "rightIcon"
  | "loadingText"
  | "iconSpacing"

interface BaseButtonProps extends Omit<ButtonProps, Omitted> {}

export interface IconButtonProps extends BaseButtonProps {
  /**
   * The icon to be used in the button.
   */
  icon?: ReactElement
  /**
   * If `true`, the button will be perfectly round. Else, it'll be slightly round
   */
  isRound?: boolean
  /**
   * A11y: A label that describes the button
   */
  "aria-label": string
}

export const IconButton = forwardRef<IconButtonProps, "button">(
  function IconButton(props, ref) {
    const { icon, children, isRound, "aria-label": ariaLabel, ...rest } = props

    /**
     * Passing the icon as prop or children should work
     */
    const element = icon || children
    const _children = isValidElement(element)
      ? cloneElement(element as any, {
          "aria-hidden": true,
          focusable: false,
        })
      : null

    return (
      <Button
        padding="0"
        borderRadius={isRound ? "full" : "md"}
        ref={ref}
        aria-label={ariaLabel}
        {...rest}
      >
        {_children}
      </Button>
    )
  },
)

if (__DEV__) {
  IconButton.displayName = "IconButton"
}
