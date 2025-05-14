"use client"

import { SVGProps, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Check, Clock, Copy, FileQuestion, Share2 } from "lucide-react"
import { toast } from "sonner"

interface InterviewSuccessProps {
  title: string
  duration: string
  questions: number
  interviewId: string
}


export function LogosSlackIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}>{/* Icon from SVG Logos by Gil Barbara - https://raw.githubusercontent.com/gilbarbara/logos/master/LICENSE.txt */}<path fill="#E01E5A" d="M53.841 161.32c0 14.832-11.987 26.82-26.819 26.82S.203 176.152.203 161.32c0-14.831 11.987-26.818 26.82-26.818H53.84zm13.41 0c0-14.831 11.987-26.818 26.819-26.818s26.819 11.987 26.819 26.819v67.047c0 14.832-11.987 26.82-26.82 26.82c-14.83 0-26.818-11.988-26.818-26.82z"></path><path fill="#36C5F0" d="M94.07 53.638c-14.832 0-26.82-11.987-26.82-26.819S79.239 0 94.07 0s26.819 11.987 26.819 26.819v26.82zm0 13.613c14.832 0 26.819 11.987 26.819 26.819s-11.987 26.819-26.82 26.819H26.82C11.987 120.889 0 108.902 0 94.069c0-14.83 11.987-26.818 26.819-26.818z"></path><path fill="#2EB67D" d="M201.55 94.07c0-14.832 11.987-26.82 26.818-26.82s26.82 11.988 26.82 26.82s-11.988 26.819-26.82 26.819H201.55zm-13.41 0c0 14.832-11.988 26.819-26.82 26.819c-14.831 0-26.818-11.987-26.818-26.82V26.82C134.502 11.987 146.489 0 161.32 0s26.819 11.987 26.819 26.819z"></path><path fill="#ECB22E" d="M161.32 201.55c14.832 0 26.82 11.987 26.82 26.818s-11.988 26.82-26.82 26.82c-14.831 0-26.818-11.988-26.818-26.82V201.55zm0-13.41c-14.831 0-26.818-11.988-26.818-26.82c0-14.831 11.987-26.818 26.819-26.818h67.25c14.832 0 26.82 11.987 26.82 26.819s-11.988 26.819-26.82 26.819z"></path></svg>
  )
}


export function LogosWhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 258" {...props}>{/* Icon from SVG Logos by Gil Barbara - https://raw.githubusercontent.com/gilbarbara/logos/master/LICENSE.txt */}<defs><linearGradient id="logosWhatsappIcon0" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stopColor="#1FAF38"></stop><stop offset="100%" stopColor="#60D669"></stop></linearGradient><linearGradient id="logosWhatsappIcon1" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stopColor="#F9F9F9"></stop><stop offset="100%" stopColor="#FFF"></stop></linearGradient></defs><path fill="url(#logosWhatsappIcon0)" d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"></path><path fill="url(#logosWhatsappIcon1)" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"></path><path fill="#FFF" d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"></path></svg>
  )
}


export function LogosGoogleGmail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.33em" height="1em" viewBox="0 0 256 193" {...props}>{/* Icon from SVG Logos by Gil Barbara - https://raw.githubusercontent.com/gilbarbara/logos/master/LICENSE.txt */}<path fill="#4285F4" d="M58.182 192.05V93.14L27.507 65.077L0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455z"></path><path fill="#34A853" d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837l-27.026 25.798z"></path><path fill="#EA4335" d="m58.182 93.14l-4.174-38.647l4.174-36.989L128 69.868l69.818-52.364l4.669 34.992l-4.669 40.644L128 145.504z"></path><path fill="#FBBC04" d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945z"></path><path fill="#C5221F" d="m0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23z"></path></svg>
  )
}

export default function InterviewSuccess({
  title = "Frontend Developer",
  duration = "15min",
  questions = 12,
  interviewId = "xyz123",
}: InterviewSuccessProps) {
  const [copied, setCopied] = useState(false)

  const interviewUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/interview/${interviewId}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(interviewUrl)
    setCopied(true)
    toast("Link copied to clipboard!")

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const shareViaEmail = () => {
    window.open(
      `mailto:?subject=Technical Interview: ${title}&body=Please complete this technical interview: ${interviewUrl}`,
    )
  }

  const shareViaWhatsApp = () => {
    window.open(`https://wa.me/?text=Please complete this technical interview: ${interviewUrl}`)
  }

  const shareViaSlack = () => {
    // This would typically open a Slack sharing dialog or integration
    // For demo purposes, we'll just copy to clipboard with a Slack-specific message
    navigator.clipboard.writeText(`Please complete this technical interview for ${title}: ${interviewUrl}`)
    toast("Ready to share on Slack!")
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4">
      <Card className="w-full max-w-md shadow-lg border-0 p-0">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 rounded-t-lg p-6 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Interview Successfully Created 🎉</h2>
          <p className="text-gray-500 mt-2">Your technical interview is ready to be shared</p>
        </CardHeader>

        <CardContent className="px-6 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm ">Interview Title</span>
              <span className="font-medium ">{title}</span>
            </div>

            <div className="flex items-center gap-x-4">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-2.5 py-0.5">
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  <span>{duration}</span>
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 px-2.5 py-0.5">
                  <FileQuestion className="mr-1 h-3.5 w-3.5" />
                  <span>{questions} questions</span>
                </Badge>
              </div>
            </div>

            <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md flex items-start">
              <span className="font-medium">Note:</span>
              <span className="ml-1">This interview is valid for 15 days.</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium ">Shareable Link</label>
            <div className="flex space-x-2">
              <Input value={interviewUrl} readOnly className="bg-gray-50 text-sm" />
              <Button
                size="sm"
                onClick={copyToClipboard}
                className="flex-shrink-0"
                variant={copied ? "outline" : "default"}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm  mt-2">Share this interview with candidates via link or apps below.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium ">Share via</label>
            <div className="flex space-x-3 mt-1">
              <Button
                variant="outline"
                size="sm"
                className="flex-1  border-0"
                onClick={shareViaSlack}
              >
                <LogosSlackIcon className="h-4 w-4 mr-2" />
                Slack
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-0"
                onClick={shareViaEmail}
              >
                <LogosGoogleGmail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1  border-0"
                onClick={shareViaWhatsApp}
              >
                <LogosWhatsappIcon className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className=" p-6 rounded-b-lg">
          <Button className="w-full" size="lg">
            <Share2 className="h-4 w-4 mr-2" />
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
