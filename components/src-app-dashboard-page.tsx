'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { Send, MessageSquare, Calendar, Users, FileText, Settings as SettingsIcon, Plus, Edit, Trash, Facebook, Instagram, Linkedin, Twitter, Database, Zap, Lock, Mail, AlertTriangle, CheckCircle, XCircle, Clock, Package, Inbox, ChevronDown, ChevronUp, DollarSign, TrendingUp, Layers, Target, Activity, MoreHorizontal, RefreshCw, AlertOctagon, Pencil } from 'lucide-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'

// Mock data
const analyticsData = [
  { date: '2023-05-01', Facebook: 150, Instagram: 120, LinkedIn: 80, Twitter: 50 },
  { date: '2023-05-02', Facebook: 160, Instagram: 130, LinkedIn: 85, Twitter: 55 },
  { date: '2023-05-03', Facebook: 140, Instagram: 110, LinkedIn: 75, Twitter: 45 },
  { date: '2023-05-04', Facebook: 180, Instagram: 140, LinkedIn: 90, Twitter: 60 },
  { date: '2023-05-05', Facebook: 200, Instagram: 160, LinkedIn: 100, Twitter: 70 },
  { date: '2023-05-06', Facebook: 190, Instagram: 150, LinkedIn: 95, Twitter: 65 },
  { date: '2023-05-07', Facebook: 170, Instagram: 135, LinkedIn: 85, Twitter: 55 },
]

const responseRateData = [
  { date: '2023-05-01', rate: 15 },
  { date: '2023-05-02', rate: 18 },
  { date: '2023-05-03', rate: 16 },
  { date: '2023-05-04', rate: 20 },
  { date: '2023-05-05', rate: 22 },
  { date: '2023-05-06', rate: 21 },
  { date: '2023-05-07', rate: 19 },
]

const conversionData = [
  { name: 'Converted', value: 400 },
  { name: 'Replied', value: 300 },
  { name: 'No Response', value: 300 },
]

const platforms = [
  { name: 'Facebook', icon: Facebook, color: '#1877F2' },
  { name: 'Instagram', icon: Instagram, color: '#E4405F' },
  { name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' },
  { name: 'Twitter', icon: Twitter, color: '#1DA1F2' },
]

const DashboardCard = ({ title, children, icon: Icon, className = '' }: { title: string; children: React.ReactNode; icon: React.ElementType; className?: string }) => (
  <Card className={`w-full ${className}`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
)
const AnalyticsDashboard = () => {
  const totalSent = analyticsData.reduce((sum, day) => 
    sum + Object.values(day).slice(1).reduce((a, b) => Number(a) + Number(b), 0), 0
  )
  const totalReplies = Math.round(totalSent * 0.19)
  const totalPositive = Math.round(totalSent * 0.075)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="Total Sent Messages" icon={Send}>
          <div className="text-2xl font-bold">{totalSent.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Across all platforms</p>
        </DashboardCard>
        <DashboardCard title="Total Replies" icon={MessageSquare}>
          <div className="text-2xl font-bold">{totalReplies.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">19% response rate</p>
        </DashboardCard>
        <DashboardCard title="Positive Responses" icon={Users}>
          <div className="text-2xl font-bold">{totalPositive.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">7.5% positive response rate</p>
        </DashboardCard>
        <DashboardCard title="Conversion Rate" icon={TrendingUp}>
          <div className="text-2xl font-bold">3.7%</div>
          <p className="text-xs text-muted-foreground">+0.5% from last week</p>
        </DashboardCard>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCard title="Messages Sent by Platform" icon={BarChart}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {platforms.map(platform => (
                <Area 
                  key={platform.name}
                  type="monotone" 
                  dataKey={platform.name} 
                  stackId="1"
                  stroke={platform.color} 
                  fill={platform.color} 
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </DashboardCard>
        
        <DashboardCard title="Response Rate Trend" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={responseRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rate" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </DashboardCard>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard title="Conversion Funnel" icon={Target}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={conversionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {conversionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28'][index % 3]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="Top Performing Templates" icon={FileText}>
          <ol className="space-y-2">
            {['Welcome Message', 'Follow-up 1', 'Re-engagement'].map((template, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{template}</span>
                <Badge>{20 - index * 2}% CTR</Badge>
              </li>
            ))}
          </ol>
        </DashboardCard>

        <DashboardCard title="Recent Activity" icon={Activity}>
          <ScrollArea className="h-[250px]">
            <ul className="space-y-2">
              {[
                { action: 'Campaign started', name: 'Summer Promo' },
                { action: 'New lead added', name: 'John Doe' },
                { action: 'Message sent', name: 'Sarah on Facebook' },
                { action: 'Positive response', name: 'LinkedIn outreach' },
                { action: 'Account connected', name: 'Twitter' },
                { action: 'Template created', name: 'Cold Outreach v2' },
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{item.action}: <strong>{item.name}</strong></span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </DashboardCard>
      </div>
    </div>
  )
}

const CampaignEditor = () => {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [currentCampaign, setCurrentCampaign] = useState<any>(null)
  const [showNewCampaignDialog, setShowNewCampaignDialog] = useState(false)

  const handleCreateCampaign = (campaignData: any) => {
    const newCampaign = {
      id: Date.now(),
      ...campaignData,
      messages: [{ id: 1, content: campaignData.initialMessage }],
      followUps: [],
    }
    setCampaigns([...campaigns, newCampaign])
    setCurrentCampaign(newCampaign)
    setShowNewCampaignDialog(false)
  }

  const handleAddMessage = () => {
    if (currentCampaign) {
      const updatedCampaign = {
        ...currentCampaign,
        messages: [...currentCampaign.messages, { id: Date.now(), content: '' }],
      }
      setCurrentCampaign(updatedCampaign)
      setCampaigns(campaigns.map(c => c.id === updatedCampaign.id ? updatedCampaign : c))
    }
  }

  const handleUpdateMessage = (messageId: number, content: string) => {
    if (currentCampaign) {
      const updatedMessages = currentCampaign.messages.map((m: any) => 
        m.id === messageId ? { ...m, content } : m
      )
      const updatedCampaign = { ...currentCampaign, messages: updatedMessages }
      setCurrentCampaign(updatedCampaign)
      setCampaigns(campaigns.map(c => c.id === updatedCampaign.id ? updatedCampaign : c))
    }
  }

  const handleAddFollowUp = () => {
    if (currentCampaign) {
      const updatedCampaign = {
        ...currentCampaign,
        followUps: [...currentCampaign.followUps, { id: Date.now(), content: '', delay: 24 }],
      }
      setCurrentCampaign(updatedCampaign)
      setCampaigns(campaigns.map(c => c.id === updatedCampaign.id ? updatedCampaign : c))
    }
  }

  const handleUpdateFollowUp = (followUpId: number, content: string, delay: number) => {
    if (currentCampaign) {
      const updatedFollowUps = currentCampaign.followUps.map((f: any) => 
        f.id === followUpId ? { ...f, content, delay } : f
      )
      const updatedCampaign = { ...currentCampaign, followUps: updatedFollowUps }
      setCurrentCampaign(updatedCampaign)
      setCampaigns(campaigns.map(c => c.id === updatedCampaign.id ? updatedCampaign : c))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Campaigns</h2>
        <Button onClick={() => setShowNewCampaignDialog(true)}>New Campaign</Button>
      </div>
      
      {campaigns.length === 0 ? (
        <div className="text-center p-12 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">No campaigns yet</h3>
          <p className="text-gray-600 mb-4">Create your first campaign to get started!</p>
          <Button onClick={() => setShowNewCampaignDialog(true)}>Create Campaign</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map(campaign => (
            <Card key={campaign.id} className="cursor-pointer hover:shadow-lg transition-shadow duration-200" onClick={() => setCurrentCampaign(campaign)}>
              <CardHeader>
                <CardTitle>{campaign.name}</CardTitle>
                <CardDescription>{campaign.messages.length} messages, {campaign.followUps.length} follow-ups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                    {campaign.status === 'active' ? 'Active' : 'Draft'}
                  </Badge>
                  <span className="text-sm text-muted-foreground">Created {new Date(campaign.id).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {currentCampaign && (
        <DashboardCard title={`Editing: ${currentCampaign.name}`} icon={Edit} className="mt-8">
          <Tabs defaultValue="messages" className="w-full">
            <TabsList>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="followUps">Follow-ups</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="messages">
              <div className="space-y-4">
                {currentCampaign.messages.map((message: any, index: number) => (
                  <Card key={message.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">Message {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={message.content}
                        onChange={(e) => handleUpdateMessage(message.id, e.target.value)}
                        placeholder="Enter your message content here..."
                        rows={4}
                      />
                      <div className="mt-2 flex items-center space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className="cursor-help">$variable</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Use $variable for lead data</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className="cursor-help">{'{{AI_PROMPT}}'}</Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Use {'{{AI_PROMPT}}'} for AI-generated content</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button onClick={handleAddMessage}>Add Message Variation</Button>
              </div>
            </TabsContent>
            <TabsContent value="followUps">
              <div className="space-y-4">
                {currentCampaign.followUps.map((followUp: any, index: number) => (
                  <Card key={followUp.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">Follow-up {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={followUp.content}
                        onChange={(e) => handleUpdateFollowUp(followUp.id, e.target.value, followUp.delay)}
                        placeholder="Enter your follow-up message content here..."
                        rows={4}
                      />
                      <div className="mt-2 flex items-center space-x-2">
                        <Label>Delay (hours):</Label>
                        <Input
                          type="number"
                          value={followUp.delay}
                          onChange={(e) => handleUpdateFollowUp(followUp.id, followUp.content, parseInt(e.target.value))}
                          className="w-20"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button onClick={handleAddFollowUp}>Add Follow-up</Button>
              </div>
            </TabsContent>
            <TabsContent value="settings">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="campaignName">Campaign Name</Label>
                  <Input 
                    id="campaignName" 
                    value={currentCampaign.name} 
                    onChange={(e) => setCurrentCampaign({...currentCampaign, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="campaignStatus">Status</Label>
                  <Select 
                    value={currentCampaign.status} 
                    onValueChange={(value) => setCurrentCampaign({...currentCampaign, status: value})}
                  >
                    <SelectTrigger id="campaignStatus">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Textarea 
                    id="targetAudience" 
                    value={currentCampaign.targetAudience || ''}
                    onChange={(e) => setCurrentCampaign({...currentCampaign, targetAudience: e.target.value})}
                    placeholder="Describe your target audience"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DashboardCard>
      )}

      <Dialog open={showNewCampaignDialog} onOpenChange={setShowNewCampaignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
          </DialogHeader>
          <NewCampaignForm onSubmit={handleCreateCampaign} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

const NewCampaignForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [name, setName] = useState('')
  const [initialMessage, setInitialMessage] = useState('')
  const [targetAudience, setTargetAudience] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, initialMessage, targetAudience, status: 'draft' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Campaign Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="initialMessage">Initial Message</Label>
        <Textarea id="initialMessage" value={initialMessage} onChange={(e) => setInitialMessage(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="targetAudience">Target Audience</Label>
        <Textarea id="targetAudience" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} placeholder="Describe your target audience" />
      </div>
      <Button type="submit">Create Campaign</Button>
    </form>
  )
}

const ScheduleSender = () => {
  const [scheduleDate, setScheduleDate] = useState('')
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])
  const [messageCount, setMessageCount] = useState(10)
  const [useProspectTimezone, setUseProspectTimezone] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState('')

  const handleStartCampaign = () => {
    console.log('Starting campaign:', { scheduleDate, selectedAccounts, messageCount, useProspectTimezone, selectedCampaign })
    // Implement the logic to start the campaign
  }

  return (
    <div className="space-y-6">
      <DashboardCard title="Schedule Sender" icon={Calendar}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="campaignSelect">Select Campaign</Label>
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger id="campaignSelect">
                <SelectValue placeholder="Choose a campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="campaign1">Summer Promotion</SelectItem>
                <SelectItem value="campaign2">New Product Launch</SelectItem>
                <SelectItem value="campaign3">Re-engagement Drive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="scheduleDate">Schedule Start Date</Label>
            <Input 
              id="scheduleDate"
              type="datetime-local" 
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
            />
          </div>
          <div>
            <Label>Select Accounts</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {platforms.map(platform => (
                <div key={platform.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={platform.name}
                    checked={selectedAccounts.includes(platform.name)}
                    onCheckedChange={(checked) => {
                      setSelectedAccounts(
                        checked
                          ? [...selectedAccounts, platform.name]
                          : selectedAccounts.filter(a => a !== platform.name)
                      )
                    }}
                  />
                  <Label htmlFor={platform.name} className="flex items-center space-x-2">
                    <platform.icon className="h-4 w-4" style={{color: platform.color}} />
                    <span>{platform.name}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="messageCount">Messages per Day</Label>
            <div className="flex items-center space-x-4">
              <Input 
                id="messageCount"
                type="number" 
                value={messageCount}
                onChange={(e) => setMessageCount(parseInt(e.target.value))}
                min={1}
                className="w-20"
              />
              <Slider
                value={[messageCount]}
                onValueChange={(value) => setMessageCount(value[0])}
                max={100}
                step={1}
                className="w-64"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="useProspectTimezone"
              checked={useProspectTimezone}
              onCheckedChange={setUseProspectTimezone}
            />
            <Label htmlFor="useProspectTimezone">Use prospect's timezone (if available)</Label>
          </div>
          <Button onClick={handleStartCampaign} className="w-full">Start Campaign</Button>
        </div>
      </DashboardCard>
      <DashboardCard title="Scheduled Campaigns" icon={Clock}>
        <div className="space-y-4">
          {[
            { name: 'Summer Promotion', date: '2023-06-01 09:00', accounts: ['Facebook', 'Instagram'] },
            { name: 'New Product Launch', date: '2023-06-15 10:00', accounts: ['LinkedIn', 'Twitter'] },
            { name: 'Re-engagement Drive', date: '2023-07-01 08:00', accounts: ['Facebook', 'LinkedIn', 'Twitter'] },
          ].map((campaign, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{campaign.name}</CardTitle>
                <CardDescription>Scheduled for {new Date(campaign.date).toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  {campaign.accounts.map(account => {
                    const platform = platforms.find(p => p.name === account)
                    return platform ? (
                      <TooltipProvider key={account}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="secondary">
                              <platform.icon className="h-4 w-4 mr-1" style={{color: platform.color}} />
                              {account}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Scheduled for {account}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : null
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardCard>
    </div>
  )
}

const AccountManager = () => {
  const [accounts, setAccounts] = useState<any[]>([])
  const [showAddAccountDialog, setShowAddAccountDialog] = useState(false)

  const handleAddAccount = (accountData: any) => {
    setAccounts([...accounts, { id: Date.now(), ...accountData }])
    setShowAddAccountDialog(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Connected Accounts</h2>
        <Button onClick={() => setShowAddAccountDialog(true)}>Add Account</Button>
      </div>
      
      {accounts.length === 0 ? (
        <div className="text-center p-12 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">No accounts connected</h3>
          <p className="text-gray-600 mb-4">Add your first account to get started!</p>
          <Button onClick={() => setShowAddAccountDialog(true)}>Connect Account</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map(account => (
            <Card key={account.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <CardTitle className="flex items-center space-x-2">
                  {platforms.find(p => p.name === account.platform)?.icon && (
                    <account.platform.icon className="h-5 w-5" />
                  )}
                  <span>{account.name}</span>
                </CardTitle>
                <CardDescription className="text-gray-200">{account.platform}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Status</span>
                    <Badge variant={account.status === 'active' ? 'default' : 'secondary'}>
                      {account.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Warm-up</span>
                    <Switch 
                      checked={account.warmup} 
                      onCheckedChange={() => {
                        const updatedAccounts = accounts.map(a => 
                          a.id === account.id ? {...a, warmup: !a.warmup} : a
                        )
                        setAccounts(updatedAccounts)
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Proxy</span>
                    <Badge variant={account.proxy ? 'default' : 'secondary'}>
                      {account.proxy ? 'Set' : 'Not set'}
                    </Badge>
                  </div>
                  <Progress value={account.health} className="w-full" />
                  <p className="text-xs text-muted-foreground text-right">Account Health: {account.health}%</p>
                </div>
              </CardContent>
              <CardContent className="bg-gray-50 border-t">
                <div className="flex justify-between items-center">
                  <Button variant="ghost" size="sm">
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <AlertOctagon className="h-4 w-4 mr-2" />
                        Troubleshoot
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showAddAccountDialog} onOpenChange={setShowAddAccountDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Account</DialogTitle>
            <DialogDescription>
              Connect a new social media account to your dashboard.
            </DialogDescription>
          </DialogHeader>
          <AddAccountForm onSubmit={handleAddAccount} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

const AddAccountForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [name, setName] = useState('')
  const [platform, setPlatform] = useState('')
  const [username, setUsername] = useState('')
  const [authMethod, setAuthMethod] = useState('password')
  const [password, setPassword] = useState('')
  const [proxy, setProxy] = useState('')
  const [warmup, setWarmup] = useState(false)
  const [cookieFile, setCookieFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ 
      name, 
      platform, 
      username, 
      authMethod, 
      password, 
      proxy, 
      warmup, 
      cookieFile,
      status: 'active',
      health: 100
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Account Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="platform">Platform</Label>
        <Select value={platform} onValueChange={setPlatform} required>
          <SelectTrigger id="platform">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            {platforms.map(p => (
              <SelectItem key={p.name} value={p.name}>
                <div className="flex items-center">
                  <p.icon className="h-4 w-4 mr-2" style={{color: p.color}} />
                  {p.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="authMethod">Authentication Method</Label>
        <Select value={authMethod} onValueChange={setAuthMethod}>
          <SelectTrigger id="authMethod">
            <SelectValue placeholder="Select auth method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="password">Password</SelectItem>
            <SelectItem value="2fa">2FA Code</SelectItem>
            <SelectItem value="oauth">OAuth</SelectItem>
            <SelectItem value="cookie">Cookie Session</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {authMethod === 'password' && (
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      )}
      {authMethod === '2fa' && (
        <div className="space-y-2">
          <Label htmlFor="2faCode">2FA Code</Label>
          <Input id="2faCode" placeholder="Enter 2FA code" />
        </div>
      )}
      {authMethod === 'cookie' && (
        <div className="space-y-2">
          <Label htmlFor="cookieFile">Cookie File</Label>
          <Input id="cookieFile" type="file" onChange={(e) => setCookieFile(e.target.files ? e.target.files[0] : null)} />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="proxy">Proxy (optional)</Label>
        <Input id="proxy" value={proxy} onChange={(e) => setProxy(e.target.value)} placeholder="host:port" />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="warmup" checked={warmup} onCheckedChange={setWarmup} />
        <Label htmlFor="warmup">Enable account warm-up</Label>
      </div>
      <Button type="submit" className="w-full">Add Account</Button>
    </form>
  )
}

const LeadManagement = () => {
  const [leads, setLeads] = useState<any[]>([])
  const [showAddLeadDialog, setShowAddLeadDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [leadsPerPage] = useState(10)

  const handleAddLead = (leadData: any) => {
    setLeads([...leads, { id: Date.now(), ...leadData }])
    setShowAddLeadDialog(false)
  }

  const handleUploadCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Process CSV file and add leads
      console.log('CSV file uploaded:', file.name)
      // You would typically use a library like Papa Parse to handle CSV parsing
    }
  }

  // Filter leads based on search term
  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.platform.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Paginate leads
  const indexOfLastLead = currentPage * leadsPerPage
  const indexOfFirstLead = indexOfLastLead - leadsPerPage
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lead Management</h2>
        <div className="space-x-2">
          <Button onClick={() => setShowAddLeadDialog(true)}>Add Lead</Button>
          <Label htmlFor="csvUpload" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md inline-flex items-center justify-center">
            Upload CSV
          </Label>
          <Input id="csvUpload" type="file" accept=".csv" className="hidden" onChange={handleUploadCSV} />
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <Input 
          placeholder="Search leads..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <p className="text-sm text-muted-foreground">
          Showing {indexOfFirstLead + 1}-{Math.min(indexOfLastLead, filteredLeads.length)} of {filteredLeads.length} leads
        </p>
      </div>

      {leads.length === 0 ? (
        <div className="text-center p-12 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">No leads yet</h3>
          <p className="text-gray-600 mb-4">Add leads manually or upload a CSV to get started!</p>
          <div className="space-x-2">
            <Button onClick={() => setShowAddLeadDialog(true)}>Add Lead</Button>
            <Label htmlFor="csvUpload" className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md inline-flex items-center justify-center">
              Upload CSV
            </Label>
          </div>
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentLeads.map(lead => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {platforms.find(p => p.name === lead.platform)?.icon && (
                        <lead.platform.icon className="h-4 w-4 mr-1" style={{color: platforms.find(p => p.name === lead.platform)?.color}} />
                      )}
                      {lead.platform}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={lead.status === 'Contacted' ? 'default' : lead.status === 'Qualified' ? 'outline' : 'secondary'}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {filteredLeads.length > leadsPerPage && (
        <div className="flex justify-center mt-4">
          <nav>
            <ul className="flex space-x-2">
              {Array.from({ length: Math.ceil(filteredLeads.length / leadsPerPage) }).map((_, index) => (
                <li key={index}>
                  <Button
                    variant={currentPage === index + 1 ? 'default' : 'outline'}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      <Dialog open={showAddLeadDialog} onOpenChange={setShowAddLeadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
          </DialogHeader>
          <AddLeadForm onSubmit={handleAddLead} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

const AddLeadForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [platform, setPlatform] = useState('')
  const [status, setStatus] = useState('New')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, email, platform, status })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="platform">Platform</Label>
        <Select value={platform} onValueChange={setPlatform} required>
          <SelectTrigger id="platform">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            {platforms.map(p => (
              <SelectItem key={p.name} value={p.name}>
                <div className="flex items-center">
                  <p.icon className="h-4 w-4 mr-2" style={{color: p.color}} />
                  {p.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={setStatus} required>
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="Qualified">Qualified</SelectItem>
            <SelectItem value="Converted">Converted</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">Add Lead</Button>
    </form>
  )
}

const TemplateLibrary = () => {
  const [templates, setTemplates] = useState<any[]>([])
  const [showAddTemplateDialog, setShowAddTemplateDialog] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddTemplate = (templateData: any) => {
    setTemplates([...templates, { id: Date.now(), ...templateData }])
    setShowAddTemplateDialog(false)
  }

  const handleEditTemplate = (updatedTemplate: any) => {
    const updatedTemplates = templates.map(t => 
      t.id === updatedTemplate.id ? updatedTemplate : t
    )
    setTemplates(updatedTemplates)
    setSelectedTemplate(null)
  }

  const handleDeleteTemplate = (templateId: number) => {
    const updatedTemplates = templates.filter(t => t.id !== templateId)
    setTemplates(updatedTemplates)
  }

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Template Library</h2>
        <Button onClick={() => setShowAddTemplateDialog(true)}>Add Template</Button>
      </div>

      <Input 
        placeholder="Search templates..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      
      {templates.length === 0 ? (
        <div className="text-center p-12 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">No templates yet</h3>
          <p className="text-gray-600 mb-4">Create your first template to get started!</p>
          <Button onClick={() => setShowAddTemplateDialog(true)}>Create Template</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map(template => (
            <Card key={template.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                <CardTitle>{template.name}</CardTitle>
                <CardDescription className="text-gray-200">{template.category}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-gray-600 mb-4">{template.content.substring(0, 100)}...</p>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{template.platform}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedTemplate(template)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteTemplate(template.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showAddTemplateDialog} onOpenChange={setShowAddTemplateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Template</DialogTitle>
          </DialogHeader>
          <AddTemplateForm onSubmit={handleAddTemplate} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <AddTemplateForm 
              onSubmit={handleEditTemplate} 
              initialData={selectedTemplate}
              isEditing={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

const AddTemplateForm = ({ onSubmit, initialData = {}, isEditing = false }: { onSubmit: (data: any) => void; initialData?: any; isEditing?: boolean }) => {
  const [name, setName] = useState(initialData.name || '')
  const [category, setCategory] = useState(initialData.category || '')
  const [content, setContent] = useState(initialData.content || '')
  const [platform, setPlatform] = useState(initialData.platform || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ id: initialData.id, name, category, content, platform })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Template Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="platform">Platform</Label>
        <Select value={platform} onValueChange={setPlatform} required>
          <SelectTrigger id="platform">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            {platforms.map(p => (
              <SelectItem key={p.name} value={p.name}>
                <div className="flex items-center">
                  <p.icon className="h-4 w-4 mr-2" style={{color: p.color}} />
                  {p.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea 
          id="content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required 
          rows={5} 
        />
        <p className="text-sm text-muted-foreground mt-1">
          Use $variable for lead data and {'{{AI_PROMPT}}'} for AI-generated content.
        </p>
      </div>
      <Button type="submit" className="w-full">{isEditing ? 'Update Template' : 'Add Template'}</Button>
    </form>
  )
}

const Settings = () => {
  const [openAIKey, setOpenAIKey] = useState('')
  const [zapierWebhook, setZapierWebhook] = useState('')
  const [calendlyAPIKey, setCalendlyAPIKey] = useState('')
  const [showBetaFeatures, setShowBetaFeatures] = useState(false)

  const handleSaveSettings = () => {
    console.log('Saving settings:', { openAIKey, zapierWebhook, calendlyAPIKey, showBetaFeatures })
    // Implement the logic to save settings
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      
      <Tabs defaultValue="integrations">
        <TabsList>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect your DM Campaign Dashboard to other services.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openAIKey">OpenAI API Key</Label>
                <Input 
                  id="openAIKey" 
                  type="password" 
                  value={openAIKey} 
                  onChange={(e) => setOpenAIKey(e.target.value)}
                  placeholder="Enter your OpenAI API key"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zapierWebhook">Zapier Webhook URL</Label>
                <Input 
                  id="zapierWebhook" 
                  value={zapierWebhook} 
                  onChange={(e) => setZapierWebhook(e.target.value)}
                  placeholder="Enter your Zapier webhook URL"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="calendlyAPIKey">Calendly API Key</Label>
                <Input 
                  id="calendlyAPIKey" 
                  type="password" 
                  value={calendlyAPIKey} 
                  onChange={(e) => setCalendlyAPIKey(e.target.value)}
                  placeholder="Enter your Calendly API key"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account details and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Change Password</Label>
                <Input id="password" type="password" placeholder="Enter new password" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="betaFeatures"
                  checked={showBetaFeatures}
                  onCheckedChange={setShowBetaFeatures}
                />
                <Label htmlFor="betaFeatures">Enable beta features</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="emailNotifications" defaultChecked />
                <Label htmlFor="emailNotifications">Email Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="pushNotifications" />
                <Label htmlFor="pushNotifications">Push Notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="smsNotifications" />
                <Label htmlFor="smsNotifications">SMS Notifications</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your subscription and payment details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Current Plan</span>
                <Badge>Pro</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Billing Cycle</span>
                <span>Monthly</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Next Billing Date</span>
                <span>June 1, 2023</span>
              </div>
              <Button className="w-full">Upgrade Plan</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSaveSettings}>Save Settings</Button>
    </div>
  )
}

const DragAndDropCampaignBuilder = () => {
  const [steps, setSteps] = useState([
    { id: '1', content: 'Send initial message', type: 'message' },
    { id: '2', content: 'Wait 1 day', type: 'delay' },
    { id: '3', content: 'Send follow-up message', type: 'message' },
  ])

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(steps)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setSteps(items)
  }

  const addStep = (type: 'message' | 'delay') => {
    const newStep = {
      id: Date.now().toString(),
      content: type === 'message' ? 'New message' : 'Wait 1 day',
      type,
    }
    setSteps([...steps, newStep])
  }

  const updateStep = (id: string, content: string) => {
    const updatedSteps = steps.map(step => 
      step.id === id ? { ...step, content } : step
    )
    setSteps(updatedSteps)
  }

  const removeStep = (id: string) => {
    const updatedSteps = steps.filter(step => step.id !== id)
    setSteps(updatedSteps)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Campaign Builder (Beta)</h2>
      <div className="flex space-x-2 mb-4">
        <Button onClick={() => addStep('message')}>Add Message</Button>
        <Button onClick={() => addStep('delay')}>Add Delay</Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="steps">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {steps.map((step, index) => (
                <Draggable key={step.id} draggableId={step.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white p-4 rounded-md shadow flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        {step.type === 'message' ? (
                          <MessageSquare className="h-5 w-5 text-blue-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-green-500" />
                        )}
                        <Input 
                          value={step.content} 
                          onChange={(e) => updateStep(step.id, e.target.value)}
                          className="border-none shadow-none"
                        />
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeStep(step.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <Button className="w-full mt-4">Save Campaign</Button>
    </div>
  )
}

export function SrcAppDashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showBetaFeatures, setShowBetaFeatures] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = async (username: string, password: string) => {
    console.log('Logging in with:', username, password)
    setIsLoggedIn(true)
    localStorage.setItem('authToken', 'demo-token')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('authToken')
  }

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-2xl text-center">DM Campaign Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => {
              e.preventDefault()
              const form = e.target as HTMLFormElement
              const username = (form.elements.namedItem('username') as HTMLInputElement).value
              const password = (form.elements.namedItem('password') as HTMLInputElement).value
              handleLogin(username, password)
            }}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" placeholder="Enter your username" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" placeholder="Enter your password" required />
                </div>
                <Button className="w-full" type="submit">Login</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">DM Campaign Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setShowBetaFeatures(!showBetaFeatures)}>
                {showBetaFeatures ? 'Disable' : 'Enable'} Beta Features
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Tabs defaultValue="analytics" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analytics"><AnalyticsDashboard /></TabsContent>
            <TabsContent value="campaigns">
              <Tabs defaultValue="editor">
                <TabsList>
                  <TabsTrigger value="editor">Campaign Editor</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  {showBetaFeatures && <TabsTrigger value="builder">Drag & Drop Builder</TabsTrigger>}
                </TabsList>
                <TabsContent value="editor"><CampaignEditor /></TabsContent>
                <TabsContent value="schedule"><ScheduleSender /></TabsContent>
                {showBetaFeatures && <TabsContent value="builder"><DragAndDropCampaignBuilder /></TabsContent>}
              </Tabs>
            </TabsContent>
            <TabsContent value="accounts"><AccountManager /></TabsContent>
            <TabsContent value="leads"><LeadManagement /></TabsContent>
            <TabsContent value="templates"><TemplateLibrary /></TabsContent>
            <TabsContent value="settings"><Settings /></TabsContent>
          </Tabs>
        </main>
        
        <Alert className="max-w-7xl mx-auto mt-8">
          <AlertTitle>Pro Tip</AlertTitle>
          <AlertDescription>
            Regularly review your campaign performance and adjust your messaging strategy based on the response rates. Don't forget to warm up new accounts gradually to improve deliverability.
          </AlertDescription>
        </Alert>
      </div>
    </TooltipProvider>
  )
}