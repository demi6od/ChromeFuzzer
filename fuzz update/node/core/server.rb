#
# Copyright (c) 2012, Stephen Fewer of Harmony Security (www.harmonysecurity.com)
# Licensed under a 3 clause BSD license (Please see LICENSE.txt)
# Source code located at https://github.com/stephenfewer/grinder
#

require 'thread'
require 'webrick'
require 'base64'
require 'core/logging'
require 'core/webstats'

module Grinder

	module Core

		class Server
			
			class NoLog < ::WEBrick::BasicLog
				def log( level, data ) end
			end
			
			class GrinderServlet < ::WEBrick::HTTPServlet::AbstractServlet

                # demi
				@@fuzzers    = []
				@@logging_js = nil
				@@jpg        = nil
				@@java        = nil
				@@class        = nil
				@@swf       = nil
				@@desc_txt        = nil
				@@download_txt        = nil
				@@frame_html        = nil
				@@frameIE_html        = nil
				@@fuzz_html        = nil
				@@blank_html        = nil
				@@target_html        = nil
				@@targetIE_html        = nil
				@@cache        = nil
				@@doc        = nil
				@@profile        = nil
				@@mp4        = nil
				@@mp3        = nil
				@@track        = nil
				@@svg        = nil
				@@xml       = nil
				@@gif        = nil
				@@pdf        = nil
				@@count      = 0
				@@index      = 0
				@@reductor   = nil
				
				@@testcases_since_update = 0
				@@last_update            = ::Time.now
				
				def self.reduction( r )
					# 'The Reductor Curse is a spell used to blast solid objects into pieces' - http://harrypotter.wikia.com/wiki/Reductor_Curse
					@@reductor = r
				end
				
				def self.add_fuzzer( name, data )
					@@fuzzers << [ name, data ]
				end
				
				def self.logging_js( data )
					@@logging_js = data
				end
				
				def self.profile( data )
					@@profile = data
				end
				
                # demi
				def self.mp4( data )
					@@mp4 = data
				end

				def self.mp3( data )
					@@mp3 = data
				end

				def self.track( data )
					@@track = data
				end

				def self.xml( data )
					@@xml = data
				end

				def self.svg( data )
					@@svg = data
				end
				
				def self.gif( data )
					@@gif = data
				end
				
				def self.java( data )
					@@java = data
				end
				
				def self.class( data )
					@@class = data
				end
				
				def self.swf( data )
					@@swf = data
				end
				
				def self.desc_txt( data )
					@@desc_txt = data
				end
				
				def self.download_txt( data )
					@@download_txt = data
				end
				
				def self.frame_html( data )
					@@frame_html = data
				end
				
				def self.frameIE_html( data )
					@@frameIE_html = data
				end
				
				def self.fuzz_html( data )
					@@fuzz_html = data
				end

				def self.blank_html( data )
					@@blank_html = data
				end
				
				def self.target_html( data )
					@@target_html = data
				end
				
				def self.targetIE_html( data )
					@@targetIE_html = data
				end
				
				def self.cache( data )
					@@cache = data
				end
				
				def self.doc( data )
					@@doc = data
				end
				
				def self.jpg( data )
					@@jpg = data
				end
				
				def self.pdf( data )
					@@pdf = data
				end

				def tcpm_update
					@@testcases_since_update += 1
					
					minutes_since_last_update = ( ( ::Time.now - @@last_update ) / 60 ).round
					
					# currently we hardcode this to 5 minutes as the window for activity in system.php is also 5 minutes.
					webstats_update_minutes   = 5
					
					if( minutes_since_last_update > webstats_update_minutes )
						begin
							if( $webstats_baseurl and $webstats_key )
								web = ::Grinder::Core::WebStats.new( $grinder_node, $webstats_baseurl, $webstats_key, $webstats_username, $webstats_password )
								
								if( @@reductor )
									web.update_job_status( @@testcases_since_update / webstats_update_minutes, ::Grinder::Core::WebStats::JOB_REDUCTION )
								else
									web.update_job_status( @@testcases_since_update / webstats_update_minutes, ::Grinder::Core::WebStats::JOB_FUZZING )
								end
								
								@@last_update = ::Time.now
									
								@@testcases_since_update = 0
							end
						rescue
						end
					end
					
					@@count += 1
					if( @@fuzzers.length > 1 and @@count > $swap_fuzzer_count )
						@@count = 0
						@@index += 1
						if( @@index > ( @@fuzzers.length - 1 ) )
							@@index = 0
						end
					end
				end
				
				def do_POST( request, response )
					if( request.path == '/testcase_crash' )
						success                  = @@reductor ? @@reductor.testcase_crash( request.query['hash'] ) : false
						response.status          = success ? 200 : 404
						response['Content-Type'] = 'text/html'
						response.body            = ''
					elsif( request.path == '/duplicate_crash' )
						success                  = @@reductor ? @@reductor.duplicate_crash( request.query['hash'] ) : false
						response.status          = 200
						response['Content-Type'] = 'text/html'
						response['duplicate']    = success.to_s
						response.body            = ''
					#elsif( request.path == '/previous_crash' )
					#	result                   = @@reductor ? @@reductor.previous_crash( request.query['hash'] ) : nil
					#	response.status          = 200
					#	response['Content-Type'] = 'text/html'
					#	response['hash']         = result ? result : ''
					#	response.body            = ''
					elsif( request.path == '/current_fuzzer' )
						response.status          = @@fuzzers.length > @@index ? 200 : 404
						response['Content-Type'] = 'text/html'
						response.body            = ''
						response['fuzzer']       = @@fuzzers.length > @@index ? @@fuzzers[ @@index ][ 0 ] : ''
					else
						response.status          = 404
						response['Content-Type'] = 'text/html'
						response.body            = ''
					end
				end
				
				def do_GET( request, response )
					if( request.path == '/grinder' )
						tcpm_update
						response.status          = @@fuzzers.length > @@index ? 200 : 404
						response['Content-Type'] = 'text/html; charset=utf-8;'
						response.body            = @@fuzzers.length > @@index ? @@fuzzers[ @@index ][ 1 ] : ''
					elsif( request.path == '/favicon.ico' )
						response.status          = 404
						response['Content-Type'] = 'text/html'
						response.body            = ''
					elsif( request.path == '/logging.js' )
						response.status          = 200
						response['Content-Type'] = 'text/javascript'
						response.body            = @@logging_js
                    # demi
					elsif( request.path == '/demicmDesc.txt' )
						response.status          = 200
						response['Content-Type'] = 'text/plain'
						response.body            = @@desc_txt
					elsif( request.path == '/demicmDownload.txt' )
						response.status          = 200
						response['Content-Type'] = 'text/plain'
						response.body            = @@download_txt
					elsif( request.path == '/demicmDoc' )
						response.status          = 200
						response['Content-Type'] = 'text/plain'
						response.body            = @@doc
					elsif( request.path == '/demicmMani.cache' )
						response.status          = 200
						response['Content-Type'] = 'text/plain'
						response.body            = @@cache
					elsif( request.path == '/demicmProfile' )
						response.status          = 200
						response['Content-Type'] = 'text/p'
						response.body            = @@profile
					elsif( request.path == '/demicmTarget.html' )
						response.status          = 200
						response['Content-Type'] = 'text/html'
						response.body            = @@target_html
					elsif( request.path == '/demicmTargetIE.html' )
						response.status          = 200
						response['Content-Type'] = 'text/html'
						response.body            = @@targetIE_html
					elsif( request.path == '/demicmBlank.html' )
						response.status          = 200
						response['Content-Type'] = 'text/html'
						response.body            = @@blank_html
					elsif( request.path == '/demicmFuzz.html' )
						response.status          = 200
						response['Content-Type'] = 'text/html'
						response.body            = @@fuzz_html
					elsif( request.path == '/demicmFrameIE.html' )
						response.status          = 200
						response['Content-Type'] = 'text/html'
						response.body            = @@frameIE_html
					elsif( request.path == '/demicmFrame.html' )
						response.status          = 200
						response['Content-Type'] = 'text/html'
						response.body            = @@frame_html
					elsif( request.path == '/demicmImg.gif' )
						response.status          = 200
						response['Content-Type'] = 'image/gif'
						response.body            = @@gif
					elsif( request.path == '/demicmAchive.class' )
						response.status          = 200
                        response['Content-Type'] = 'application/java-vm'
						response.body            = @@class
					elsif( request.path == '/demicmAchive.java' )
						response.status          = 200
                        response['Content-Type'] = 'application/java-archive'
						response.body            = @@java
					elsif( request.path == '/demicmData.swf' )
						response.status          = 200
						response['Content-Type'] = 'application/x-shockwave-flash'
						response.body            = @@swf
                    elsif( request.path == '/demicmAudio.mp3' )
						response.status          = 200
                        response['Content-Type'] = 'audio/mp3'
						response.body            = @@mp3
                    elsif( request.path == '/demicmVideo.mp4' )
						response.status          = 200
                        response['Content-Type'] = 'video/mp4'
						response.body            = @@mp4
                    elsif( request.path == '/demicmTrack.vtt' )
						response.status          = 200
                        response['Content-Type'] = 'text/vtt'
						response.body            = @@track
                    elsif( request.path == '/demicmSvg.svg' )
						response.status          = 200
                        response['Content-Type'] = 'image/svg+xml'
						response.body            = @@svg
                    elsif( request.path == '/demicmXml.xml' )
						response.status          = 200
                        response['Content-Type'] = 'text/xml'
						response.body            = @@xml
					elsif( request.path == '/testcase_generate' )
						html                     = @@reductor ? @@reductor.testcase_generate : nil
						response['Content-Type'] = 'text/html; charset=utf-8;'
						if( html )
							tcpm_update
							response.status      = 200
							response.body        = html
						else
							response.status      = 404
							response.body        = ''
						end
					elsif( request.path == '/testcase_processed' )
						@@reductor.testcase_processed if @@reductor
						# use a 307 temporary redirect back to /testcase_generate to keep this show on the road
						response.status          = 307 
						response['Content-Type'] = 'text/html; charset=utf-8;'
						response['Location']     = '/testcase_generate'
						response.body            = ''
					elsif( request.path == '/grind.jpg' )
						response.status          = 200
						response['Content-Type'] = 'image/jpeg'
						response.body            = @@jpg
					elsif( request.path == '/grind.pdf' )
						response.status          = 200
						response['Content-Type'] = 'application/pdf'
						response.body            = @@pdf
					elsif( request.path == '/grind.js' )
						response.status          = 200
						response['Content-Type'] = 'text/javascript'
						response.body            = 'var ph33r;'
					elsif( request.path == '/grind.html' )
						response.status          = 200
						response['Content-Type'] = 'text/html; charset=utf-8;'
						response.body            = '<p>Hello from grind.html</p>'
					elsif( request.path == '/grind.css' )
						response.status          = 200
						response['Content-Type'] = 'text/css'
						response.body            = 'body { color:red; }'
					elsif( request.path == '/grind.swf' )
						response.status          = 200
						response['Content-Type'] = 'application/x-shockwave-flash'
						response.body            = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
					elsif( request.path == '/grind.svg' )
						response.status          = 200
						response['Content-Type'] = 'image/svg+xml'
						response.body            = "<?xml version='1.0' standalone='no'?><!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg xmlns='http://www.w3.org/2000/svg' version='1.1'><circle cx='50' cy='50' r='50' fill-opacity='.3' fill='orange'/><circle cx='100' cy='50' r='50' fill-opacity='.3' fill='orange'/><circle cx='75' cy='100' r='50' fill-opacity='.3' fill='orange'/><text x='40' y='70' fill='black'>Grinder</text></svg>"
					else
						# all requests that would generate a 404 response are instead handled with a 307 temporary redirect back to /grinder
						response.status          = 307
						response['Content-Type'] = 'text/html; charset=utf-8;'
						response['Location']     = '/grinder'
						response.body            = ''
					end
				end
			end
			
			def initialize( address, port, browser=nil, fuzzer=nil, reduction=nil )
				@address         = address
				@port            = port
				@browser         = browser
				@dummy_websocket = nil
				@server          = nil
				@thread          = nil
				
				GrinderServlet.reduction( reduction )
				
				if( $webstats_baseurl and $webstats_key )
					web = ::Grinder::Core::WebStats.new( $grinder_node, $webstats_baseurl, $webstats_key, $webstats_username, $webstats_password )
					if( reduction )
						web.update_job_status( 0, ::Grinder::Core::WebStats::JOB_REDUCTION )
					else
						web.update_job_status( 0, ::Grinder::Core::WebStats::JOB_FUZZING )
					end
				end
				
				# if no reduction object is specified we treat this server instance as a server for reduction/verification 
				# and not fuzzing thus we dont send an initial status update or load any of the fuzzers.
				if( not reduction )
					$fuzzers_dir = $fuzzers_dir + ( $fuzzers_dir.end_with?( "\\" ) ? '' : "\\" )

					fuzzer_directories = [ $fuzzers_dir ]
					
					if( @browser )
						fuzzer_directories << $fuzzers_dir + @browser + "\\"
					end
					
					fuzzer_directories.each do | fuzzdir |
					
						next if not ::Dir.exist?( fuzzdir )
						
						::Dir.foreach( fuzzdir ) do | fuzzfile |
						
							ext = ::File.extname( fuzzfile )
							
							if( ext.downcase == '.html' )
							
								name = fuzzfile[ 0, fuzzfile.length - ext.length ]
								
								# if the user has specified a fuzzer on the command line (via --fuzzer=MyAwesomeFuzzer1) we 
								# can choose to only load the specified fuzzer and no others.
								if( fuzzer and fuzzer != name )
									next
								end
								
								::File.open( "#{fuzzdir}#{fuzzfile}", 'r' ) do | f |
									print_status( "Adding fuzzer '#{name}' to the testcase server" )
									GrinderServlet.add_fuzzer( name, f.read( f.stat.size ) )
								end
							end
							
						end
						
					end
				end
				
				::File.open( './data/logging.js', 'r' ) do | f |
					GrinderServlet.logging_js( f.read( f.stat.size ) )
				end
				
                # demi
				::File.open( './data/demicmAchive.java', 'r' ) do | f |
					GrinderServlet.java( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmCodeBase.class', 'r' ) do | f |
					GrinderServlet.class( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmData.swf', 'r' ) do | f |
					GrinderServlet.swf( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmDesc.txt', 'r' ) do | f |
					GrinderServlet.desc_txt( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmDoc', 'r' ) do | f |
					GrinderServlet.doc( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmDownload.txt', 'r' ) do | f |
					GrinderServlet.download_txt( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmFrameIE.html', 'r' ) do | f |
					GrinderServlet.frameIE_html( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmFrame.html', 'r' ) do | f |
					GrinderServlet.frame_html( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmFuzz.html', 'r' ) do | f |
					GrinderServlet.fuzz_html( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmBlank.html', 'r' ) do | f |
					GrinderServlet.blank_html( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmImg.gif', 'r' ) do | f |
					GrinderServlet.gif( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmMani.cache', 'r' ) do | f |
					GrinderServlet.cache( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmProfile', 'r' ) do | f |
					GrinderServlet.profile( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmTargetIE.html', 'r' ) do | f |
					GrinderServlet.targetIE_html( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmTarget.html', 'r' ) do | f |
					GrinderServlet.target_html( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmVideo.mp4', 'r' ) do | f |
					GrinderServlet.mp4( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmAudio.mp3', 'r' ) do | f |
					GrinderServlet.mp3( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmTrack.vtt', 'r' ) do | f |
					GrinderServlet.track( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmSvg.svg', 'r' ) do | f |
					GrinderServlet.svg( f.read( f.stat.size ) )
				end
				
				::File.open( './data/demicmXml.xml', 'r' ) do | f |
					GrinderServlet.xml( f.read( f.stat.size ) )
				end
				
				::File.open( './data/grind.jpg', 'rb' ) do | f |
					GrinderServlet.jpg( f.read( f.stat.size ) )
				end
				
				::File.open( './data/grind.pdf', 'rb' ) do | f |
					GrinderServlet.pdf( f.read( f.stat.size ) )
				end
				
			end

			def start
				return if @thread and @thread.alive?
				print_status( "Testcase server running on #{@address}:#{@port}" )
				@thread = ::Thread.new do
					# try to create a socket for a dummy websocket server, ignore if this fails
					begin
						@dummy_websocket = ::TCPServer.open( @address, 6666 )
					rescue
						@dummy_websocket = nil
					end
					
					@server = ::WEBrick::HTTPServer.new(
							:BindAddress  => @address,
							:Port         => @port,
							:AccessLog    => [],
							:Logger       => NoLog.new
						)
					
					@server.mount( '/', GrinderServlet )

					@server.start
				end
			end

			def wait
				@thread.join
			end
			
			def stop
				print_status( "Stopping the testcase server" )
				if( @thread )
					@thread.kill
					@thread = nil
				end
				if( @server )
					@server.shutdown
					@server.stop
					@server = nil
				end
				if( @dummy_websocket )
					@dummy_websocket.close
					@dummy_websocket = nil
				end
			end
		end

	end

end

if( $0 == __FILE__ )

	verbose = true
	
	if( ARGV.include?( '--quiet' ) or ARGV.include?( '-q' ) or ARGV.include?( '/q' ) or ARGV.include?( '/quiet' ) )
		verbose = false
	end
	
	print_init( 'SERVER', verbose, false )
	
	print_status( "Starting at #{::Time.new.strftime( "%Y-%m-%d %H:%M:%S" )}" )
	
	browser = nil
	fuzzer  = nil
	
	ARGV.each do | arg |
		if( arg.include?( '--browser=' ) )
			browser = arg[10,arg.length]
		elsif( arg.include?( '--fuzzer=' ) )
			fuzzer = arg[9,arg.length]
		elsif( arg.include?( '--config=' ) )
			config_file = arg[9,arg.length]
			begin
				require config_file
			rescue ::LoadError
				print_error( "Failed to load the config file '#{config_file}'." )
				::Kernel::exit( false )
			end
		end
	end
	
	server = Grinder::Core::Server.new( $server_address, $server_port, browser, fuzzer )
	
	server.start
	
	server.wait
	
	print_status( "Finished at #{::Time.new.strftime( "%Y-%m-%d %H:%M:%S" )}" )

	::Kernel::exit( true )
end
